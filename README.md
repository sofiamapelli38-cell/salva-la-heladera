# Salvá la Heladera

## Qué construí
Construí una aplicación web que ayuda a organizar las comidas de varios días a partir de los ingredientes disponibles en casa. Está pensada para personas que quieren aprovechar lo que ya tienen, priorizar alimentos próximos a vencerse y evitar compras innecesarias. La aplicación propone un menú y genera una lista de compras agrupada por categorías.

## Cómo se lo pedí
Primero le expliqué al agente el problema y el resultado que quería obtener:

> Quiero construir, sin escribir código, una aplicación pequeña con un agente de IA que ayude a organizar las comidas de la semana.
> La persona debe poder indicar para cuántas personas cocina, qué ingredientes ya tiene, qué alimentos no consume, cuánto tiempo dispone para cocinar y para cuántos días necesita el menú.
> El agente debe analizar esa información, crear un menú sencillo y generar una lista de compras agrupada por categorías. También debe permitir reemplazar una comida sin rehacer necesariamente todo el menú.
> La primera versión debe ser realizable en una tarde. Ayudame a definir el alcance mínimo, qué pantallas necesita y cómo construirla paso a paso sin que yo escriba código. Antes de comenzar, explicame qué parte del sistema funcionará como agente y qué decisiones tomará.

Después aclaré que quería construir la aplicación directamente con el agente dentro de ChatGPT:

> ahh mi idea es construirlo acá

El agente propuso una primera versión acotada con un formulario, un menú generado a partir de los datos ingresados, una lista de compras y la posibilidad de modificar una sola comida. Acepté esa versión y le pedí continuar con la documentación y la publicación:

> esta perfecta! sigamos con el README y github, guiame paso a paso

## Qué funciona
La aplicación permite indicar la cantidad de personas, la cantidad de días y si se quieren organizar almuerzos, cenas o ambas comidas. También recibe los ingredientes disponibles, los alimentos próximos a vencerse, los alimentos que no se consumen, el tiempo máximo de preparación y una preferencia general.

Al presionar **“Crear mi menú”**, genera una propuesta organizada por día, señala los ingredientes que ya están disponibles y los que faltan, y crea una lista de compras agrupada por categorías. Los alimentos próximos a vencerse reciben mayor prioridad y aparecen identificados con la etiqueta **“Usar primero”**. También funciona el botón **“Cambiar solo esta comida”**, que reemplaza una propuesta puntual y actualiza la lista de compras sin modificar el resto del menú.

Probé la aplicación con el caso de dos personas, tres cenas, ingredientes disponibles y dos alimentos próximos a vencerse. El formulario, la generación del menú, la priorización y el reemplazo puntual funcionaron correctamente.

Aplicación publicada: [Salvá la Heladera](https://salva-la-heladera.sofiamapelli38.chatgpt.site)

## Qué falta o qué falló
En la primera prueba no apareció un error que impidiera usar la aplicación. Sin embargo, el prototipo trabaja con un conjunto acotado de recetas y una lógica de priorización simple, por lo que todavía no comprende todas las variantes posibles de ingredientes o restricciones alimentarias.

Tampoco calcula cantidades exactas según el número de personas, no guarda menús anteriores y no permite cargar fechas de vencimiento específicas. La preferencia de tiempo se muestra en el resultado, pero las duraciones todavía son estimadas y no están verificadas receta por receta. Estas funciones quedaron afuera para mantener el alcance realizable en una tarde.

## Qué aprendí
Aprendí que trabajar con un agente no consiste solamente en pedirle que construya una aplicación, sino en explicar con claridad el problema, las restricciones y el resultado esperado. También entendí que es importante achicar el alcance y definir qué debe quedar afuera de la primera versión. El agente pudo transformar una necesidad cotidiana en una aplicación funcional sin que yo escribiera código, pero las decisiones y validaciones finales siguieron dependiendo de mí. Documentar los prompts y las limitaciones me ayudó a comprender mejor cómo se fue construyendo el resultado.
