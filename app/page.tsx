"use client";

import { useMemo, useState } from "react";

type Meal = { day:number; slot:"Almuerzo"|"Cena"; title:string; description:string; uses:string[]; missing:string[]; urgent:boolean };
const recipes = [
  { title:"Tarta rústica de verduras", keys:["espinaca","acelga","zapallito","cebolla"], pantry:["tapas de tarta","queso"] },
  { title:"Bowl tibio de pollo y arroz", keys:["pollo","arroz","zanahoria","cebolla"], pantry:["salsa de soja"] },
  { title:"Pasta cremosa con vegetales", keys:["espinaca","brócoli","queso crema","tomate"], pantry:["fideos"] },
  { title:"Tortilla completa al horno", keys:["huevo","papa","cebolla","queso"], pantry:[] },
  { title:"Salteado exprés de arroz y huevo", keys:["arroz","huevo","zanahoria","cebolla"], pantry:["salsa de soja"] },
  { title:"Pollo al horno con verduras", keys:["pollo","papa","zanahoria","cebolla"], pantry:[] },
  { title:"Ensalada completa de garbanzos", keys:["garbanzo","tomate","huevo","zanahoria"], pantry:["limón"] },
  { title:"Omelette relleno", keys:["huevo","queso","espinaca","tomate"], pantry:[] },
  { title:"Arroz cremoso de verduras", keys:["arroz","zanahoria","cebolla","queso crema"], pantry:["caldo"] },
  { title:"Wraps caseros de pollo", keys:["pollo","tomate","zanahoria","queso crema"], pantry:["tortillas"] },
];
const categories:Record<string,string> = { pollo:"Carnicería",queso:"Lácteos","queso crema":"Lácteos",huevo:"Lácteos",tomate:"Verdulería",zanahoria:"Verdulería",cebolla:"Verdulería",espinaca:"Verdulería",acelga:"Verdulería",zapallito:"Verdulería",papa:"Verdulería",brócoli:"Verdulería",limón:"Verdulería",fideos:"Almacén",arroz:"Almacén",garbanzo:"Almacén",caldo:"Almacén","salsa de soja":"Almacén","tapas de tarta":"Otros",tortillas:"Otros" };
const cleanList=(value:string)=>value.toLowerCase().split(/,|\n/).map(x=>x.trim()).filter(Boolean);
const hasIngredient=(list:string[],key:string)=>list.some(item=>item.includes(key)||key.includes(item));

export default function Home(){
  const [people,setPeople]=useState(2),[days,setDays]=useState(3),[slots,setSlots]=useState("Cena"),[minutes,setMinutes]=useState(30);
  const [available,setAvailable]=useState("pollo, arroz, tomates, zanahoria, huevos, media cebolla");
  const [urgent,setUrgent]=useState("espinaca, queso crema"),[avoid,setAvoid]=useState("pescado"),[preference,setPreference]=useState("Sencillas y saludables");
  const [meals,setMeals]=useState<Meal[]>([]),[showResults,setShowResults]=useState(false);

  const generate=()=>{
    const have=cleanList(available),expiring=cleanList(urgent),blocked=cleanList(avoid),allHave=[...have,...expiring];
    const mealSlots:("Almuerzo"|"Cena")[]=slots==="Ambas"?["Almuerzo","Cena"]:[slots as "Almuerzo"|"Cena"];
    const ranked=recipes.filter(r=>!blocked.some(b=>r.title.toLowerCase().includes(b)||r.keys.includes(b))).map(r=>({...r,score:r.keys.filter(k=>hasIngredient(allHave,k)).length+r.keys.filter(k=>hasIngredient(expiring,k)).length*3})).sort((a,b)=>b.score-a.score);
    const result:Meal[]=[]; let index=0;
    for(let day=1;day<=days;day++) for(const slot of mealSlots){ const recipe=ranked[index%ranked.length]; const uses=recipe.keys.filter(k=>hasIngredient(allHave,k)); const missing=[...recipe.keys,...recipe.pantry].filter(k=>!hasIngredient(allHave,k)); result.push({day,slot,title:recipe.title,description:`${preference||"Una opción práctica"} para ${people} ${people===1?"persona":"personas"}, lista en aproximadamente ${Math.min(minutes,35)} minutos.`,uses,missing,urgent:recipe.keys.some(k=>hasIngredient(expiring,k))}); index++; }
    setMeals(result); setShowResults(true); setTimeout(()=>document.getElementById("results")?.scrollIntoView({behavior:"smooth"}),50);
  };
  const replaceMeal=(mealIndex:number)=>{ const current=meals[mealIndex],have=[...cleanList(available),...cleanList(urgent)],alts=recipes.filter(r=>r.title!==current.title),recipe=alts[(mealIndex+3)%alts.length]; const updated:Meal={...current,title:recipe.title,description:`${preference||"Una opción práctica"} para ${people} ${people===1?"persona":"personas"}, lista en aproximadamente ${Math.min(minutes,35)} minutos.`,uses:recipe.keys.filter(k=>hasIngredient(have,k)),missing:[...recipe.keys,...recipe.pantry].filter(k=>!hasIngredient(have,k)),urgent:recipe.keys.some(k=>hasIngredient(cleanList(urgent),k))}; setMeals(meals.map((meal,i)=>i===mealIndex?updated:meal)); };
  const shopping=useMemo(()=>[...new Set(meals.flatMap(m=>m.missing))].reduce<Record<string,string[]>>((acc,item)=>{ const category=categories[item]??"Otros";(acc[category]??=[]).push(item);return acc;},{}),[meals]);

  return <main>
    <header className="topbar"><a className="brand" href="#top"><span className="brand-mark">S</span> Salvá la Heladera</a><span className="prototype">Prototipo · Iteración 1</span></header>
    <section className="hero" id="top"><div className="eyebrow">MENOS DESPERDICIO · MÁS ORGANIZACIÓN</div><h1>Convertí lo que ya tenés<br/><em>en un menú posible.</em></h1><p>Contanos qué hay en tu heladera. Organizamos tus comidas, priorizamos lo que está por vencer y te decimos exactamente qué falta comprar.</p><div className="hero-pills"><span>✓ Aprovechá lo que tenés</span><span>✓ Comprá solo lo necesario</span><span>✓ Cambiá una comida sin empezar de nuevo</span></div></section>
    <section className="planner"><div className="section-heading"><span>01</span><div><p>PRIMER PASO</p><h2>Contame qué tenés</h2></div></div>
      <div className="form-grid">
        <label><span>¿Para cuántas personas?</span><input type="number" min="1" max="10" value={people} onChange={e=>setPeople(Number(e.target.value))}/></label>
        <label><span>¿Para cuántos días?</span><input type="number" min="1" max="7" value={days} onChange={e=>setDays(Number(e.target.value))}/></label>
        <label><span>¿Qué comidas organizamos?</span><select value={slots} onChange={e=>setSlots(e.target.value)}><option>Almuerzo</option><option>Cena</option><option>Ambas</option></select></label>
        <label><span>Tiempo máximo para cocinar</span><select value={minutes} onChange={e=>setMinutes(Number(e.target.value))}><option value="15">15 minutos</option><option value="30">30 minutos</option><option value="45">45 minutos</option><option value="60">60 minutos</option></select></label>
        <label className="wide"><span>¿Qué ingredientes ya tenés?</span><small>Separalos con comas</small><textarea value={available} onChange={e=>setAvailable(e.target.value)} placeholder="Ej: pollo, arroz, zanahoria..."/></label>
        <label className="wide urgent-field"><span>¿Qué está próximo a vencerse?</span><small>Lo vamos a priorizar en las primeras comidas</small><textarea value={urgent} onChange={e=>setUrgent(e.target.value)} placeholder="Ej: espinaca, queso crema..."/></label>
        <label><span>¿Qué alimentos no consumís?</span><input value={avoid} onChange={e=>setAvoid(e.target.value)} placeholder="Ej: pescado, gluten..."/></label>
        <label><span>¿Cómo preferís tus comidas?</span><input value={preference} onChange={e=>setPreference(e.target.value)} placeholder="Ej: sencillas y saludables"/></label>
      </div><button className="primary" onClick={generate}>Crear mi menú <span>→</span></button>
    </section>
    {showResults&&<section className="results" id="results"><div className="section-heading"><span>02</span><div><p>PROPUESTA PERSONALIZADA</p><h2>Tu menú organizado</h2></div></div><div className="result-layout"><div className="meal-list">{meals.map((meal,index)=><article className="meal-card" key={`${meal.day}-${meal.slot}`}><div className="meal-meta"><span>DÍA {meal.day} · {meal.slot.toUpperCase()}</span>{meal.urgent&&<b>USAR PRIMERO</b>}</div><h3>{meal.title}</h3><p>{meal.description}</p><div className="ingredient-row"><span><strong>Ya tenés:</strong> {meal.uses.length?meal.uses.join(", "):"—"}</span><span><strong>Falta:</strong> {meal.missing.length?meal.missing.join(", "):"nada"}</span></div><button className="replace" onClick={()=>replaceMeal(index)}>↻ Cambiar solo esta comida</button></article>)}</div><aside className="shopping"><div className="bag-icon">⌑</div><p>LISTA INTELIGENTE</p><h3>Lo que falta comprar</h3>{Object.keys(shopping).length?Object.entries(shopping).map(([category,items])=><div className="shop-group" key={category}><h4>{category}</h4>{items.map(item=><label key={item}><input type="checkbox"/> <span>{item}</span></label>)}</div>):<p className="empty">¡Tenés todo lo necesario!</p>}<div className="shopping-note">La lista se actualiza si cambiás una comida.</div></aside></div></section>}
    <footer><span className="brand"><span className="brand-mark">S</span> Salvá la Heladera</span><p>Un prototipo para aprovechar mejor los alimentos de cada semana.</p></footer>
  </main>;
}
