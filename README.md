# AnalizadorMinerales

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.0.

## Development server

To start a local development server, run:

```bash
ng serve -o
```

## Interfaces

- userData: para los datos introducidos del astronauta

- mineralData: para los datos introducidos sobre el mineral

- inputValidator: para validar que el formato de los datos introducidos es correcto

- inputDisplayMode: para mostrar los inputs del formulario como el usuario/a prefiera

- mineralCriteria: criterios generales existentes: ígneas, sedimentarias y metamórficas. Propiedad: tipo

- igneousCriteria: requerimientos de las rocas ígneas. Propiedad: tipo, requisitos

- sedimentaryCriteria: requerimientos de las rocas sedimentarias. Propiedad: tipo, requisitos

- metamorphicCriteria: requerimientos de las rocas metamórficas. Propiedad: tipo, requisitos

- criteriaMessage: devuelve la información completa de porqué el mineral no complió los requerimientos. (devuelve si es válido, que requisitos no cumplió y un mensaje)

- languageConfig: cambia el idioma del texto según las preferencias del usuario/a. Esto también afecta a las unidades de medida

- mineralRepository

- unitSystem (devuelve la unidad de medida y los cálculos de conversión)

## Componentes

- headerComponent (donde se puede cambiar el idioma y el tema)

- userInputComponent

- mineralInputComponent

- mineralCriteriaComponent (valida y muestra el mensaje)

- formActionsComponent (se encarga de ejecutar las funcionalidades y de la configuración de criterios y formatos)

## Servicios

- inputMineralValidatorService

- inputUserValidatorService

- displayModeService (devuelve una versión "extendida" o "reducida" del HTML)

- mineralCriteriaService (devuelve válido o no vádido y un mensaje/errores)

- lenguageService

- mineralRepository (guarda en el localStorage los datos del mineral; también se encarga de devolverlos)

- theme

- unitSystemService (comprueba que idioma está seleccionado y hace los cálculos para que las unidades se adapten)

## Internacionalización:
Comando para descargar la librería:

```bash
    ng add @angular/localize
```

Comando que se debe emplear cada vez que se añada un atributo i18n 
(con antelación, se habrá tenido que crear la carpeta "locale" como hija de "src"):

```bash
    ng extract-i18n --output-path src/locale 
```
