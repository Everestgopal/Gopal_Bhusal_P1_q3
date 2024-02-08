require([
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Search",
  "esri/widgets/Legend",
  "esri/layers/ElevationLayer",
  "esri/layers/OpenStreetMapLayer",
  "esri/PopupTemplate" // Import PopupTemplate module
], function(WebScene, SceneView, FeatureLayer, Search, Legend, ElevationLayer, OpenStreetMapLayer, PopupTemplate) {

  // Define a popupTemplate for the damLayer
  const damPopupTemplate = new PopupTemplate({
    title: "Dam Details",
    content: [{
      type: "fields",
      fieldInfos: [
        { fieldName: "name", label: "Name" },
        { fieldName: "Latitude", label: "Latitude" },
        { fieldName: "Longitude", label: "Longitude" },
        { fieldName: "County", label: "County" }
      ]
    }]
  });

  const damLayer = new FeatureLayer({
    url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/NewdamsMissouri/FeatureServer",
    popupTemplate: damPopupTemplate // Assign popupTemplate to the damLayer
  });

  const boundaryLayer = new FeatureLayer({
    url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/MO_2018_County_Boundaries_shp/FeatureServer"
  });

  const view = new SceneView({
    container: "viewDiv",
    map: new WebScene({
      basemap: {
        baseLayers: [new OpenStreetMapLayer()]
      },
      ground: {
        layers: [new ElevationLayer()]
      },
      layers: [damLayer, boundaryLayer]
    }),
    popup: {
      dockEnabled: true,
      dockOptions: {
        buttonEnabled: false,
        breakpoint: false,
        position: "top-right"
      }
    }
  });

  const searchWidget = new Search({
    view: view,
    container: "searchContainer"
  });

  const legend = new Legend({
    view: view
  });

  view.ui.add(legend, "top-right");

});