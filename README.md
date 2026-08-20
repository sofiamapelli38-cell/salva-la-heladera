# Salvá la Heladera

## Qué construí

Construí una aplicación web que ayuda a organizar las comidas de varios días a partir de los ingredientes disponibles en casa. Está pensada para personas que quieren aprovechar lo que ya tienen, priorizar alimentos próximos a vencerse y evitar compras innecesarias. La aplicación propone un menú y genera una lista de compras agrupada por categorías.

Elegí esta idea porque muchas veces se me echa a perder comida por no tener un menú organizado o me falta un ingrediente específico para preparar una receta.

## Cómo se lo pedí

Antes de comenzar, evalué distintas ideas y elegí trabajar sobre un problema cotidiano que me ocurre personalmente. Decidí que la aplicación debía utilizar primero los ingredientes disponibles, priorizar los alimentos próximos a vencerse y permitir cambiar una comida sin rehacer todo el menú.

Mi primer pedido al agente fue:

> Quiero construir, sin escribir código, una aplicación pequeña con un agente de IA que ayude a organizar las comidas de la semana.
>
> La persona debe poder indicar para cuántas personas cocina, qué ingredientes ya tiene, qué alimentos no consume, cuánto tiempo dispone para cocinar y para cuántos días necesita el menú.
>
> El agente debe analizar esa información, crear un menú sencillo y generar una lista de compras agrupada por categorías. También debe permitir reemplazar una comida sin rehacer necesariamente todo el menú.
>
> La primera versión debe ser realizable en una tarde. Ayudame a definir el alcance mínimo, qué pantallas necesita y cómo construirla paso a paso sin que yo escriba código. Antes de comenzar, explicame qué parte del sistema funcionará como agente y qué decisiones tomará.

El agente propuso una versión mínima y explicó qué funciones convenía dejar afuera para mantener el alcance de “una tarde”. Después aclaré que quería construir la aplicación directamente dentro de ChatGPT:

> ahh mi idea es construirlo acá

A partir de la propuesta, decidí conservar el formulario, el menú generado, la priorización de alimentos próximos a vencerse, la lista de compras y la posibilidad de cambiar una comida puntual. También decidí dejar afuera el registro de usuarios, el cálculo de calorías, los precios de supermercados, las fechas exactas de vencimiento y el guardado de menús anteriores.

Una vez construida la primera versión, la probé y consideré que respondía al alcance definido. Entonces pedí continuar con la documentación y la publicación:

> esta perfecta! sigamos con el README y github, guiame paso a paso

Durante la publicación también interactué con el agente para crear el repositorio, ordenar los archivos en sus carpetas correspondientes, detectar archivos repetidos y corregir la estructura final.

## Qué funciona

La aplicación permite indicar la cantidad de personas, la cantidad de días y si se quieren organizar almuerzos, cenas o ambas comidas. También recibe los ingredientes disponibles, los alimentos próximos a vencerse, los alimentos que no se consumen, el tiempo máximo de preparación y una preferencia general.

Al presionar **“Crear mi menú”**, genera una propuesta organizada por día, señala los ingredientes que ya están disponibles y los que faltan, y crea una lista de compras agrupada por categorías. Los alimentos próximos a vencerse reciben mayor prioridad y aparecen identificados con la etiqueta **“Usar primero”**.

También funciona el botón **“Cambiar solo esta comida”**, que reemplaza una propuesta puntual y actualiza la lista de compras sin modificar el resto del menú.

Probé la aplicación con un caso de dos personas, tres cenas, distintos ingredientes disponibles y dos alimentos próximos a vencerse. Revisé que el formulario funcionara, que se respetaran las restricciones, que se priorizaran los alimentos próximos a vencer y que el reemplazo modificara solamente una comida.

El agente no se limita a mostrar información fija: analiza los ingredientes, las restricciones, las preferencias y el tiempo disponible. A partir de esos datos, decide qué alimentos priorizar, cómo combinarlos en el menú y qué productos faltan comprar.

Aplicación publicada: [Salvá la Heladera](https://salva-la-heladera.sofiamapelli38.chatgpt.site)

## Qué falta o qué falló

En la primera prueba no apareció un error que impidiera utilizar la aplicación. Sin embargo, el prototipo trabaja con un conjunto acotado de recetas y una lógica de priorización simple, por lo que todavía no comprende todas las combinaciones posibles de ingredientes o restricciones alimentarias.

Tampoco calcula cantidades exactas según el número de personas, no guarda menús anteriores y no permite cargar fechas específicas de vencimiento. La preferencia de tiempo se muestra en el resultado, pero las duraciones son estimadas y no están verificadas receta por receta.

Durante la publicación en GitHub, inicialmente algunos archivos se cargaron fuera de sus carpetas y quedaron duplicados. Con la ayuda del agente identifiqué el problema, creé las carpetas `app`, `public` y `scripts`, cargué los archivos correspondientes y eliminé los duplicados.

Estas funciones y mejoras quedaron afuera para mantener el alcance realizable en una tarde.

## Qué aprendí

Aprendí que trabajar con un agente no significa dejarle todas las decisiones. Primero tuve que identificar un problema concreto, explicar mis prioridades y definir un alcance posible para una tarde. El agente me ayudó a transformar esas decisiones en una aplicación, pero yo tuve que evaluar si la propuesta respondía a mi necesidad, decidir qué funciones conservar y cuáles dejar para una versión futura. También entendí que interactuar con un agente implica dar contexto, revisar el resultado, detectar problemas y tomar decisiones durante todo el proceso.
