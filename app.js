const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  addAnswer,
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

const citasConfirmacion = addKeyword([
  "Agendar",
  "agendar",
  "Confirmación",
  "confirmación",
])
  .addAnswer([
    "Tu sita será confirmada en unos instantes, gracias por tu preferencia 😉",
  ])
  .addAnswer([
    "Recuerda que para proceder con la confirmación de tu cita, tienes que hacer un depósito de $100 MXN a la siguiente cuenta: ",
  ])
  .addAnswer(["*0123456789*"])
  .addAnswer([
    "Recuerda, después de hacer el depósito, mandar tu comprobante. Gracias 😊",
  ]);

const hijo_citas = addKeyword(["Citas", "citas", "Cita", "Cita"])
  .addAnswer([
    "Para agendar una *Cita* introduce tu:\n",
    "*-Nombre*\n",
    "*-Fecha*\n",
    "*-Telefono*\n",
    "*Nombre del Servicio*\n",
    "Junto con la palabra *Agendar*",
  ])
  .addAnswer(["*La hora se te asignará*"], null, null, [citasConfirmacion]);
const hijo_Precios = addKeyword([
  "Precios",
  "precios",
  "PRECIOS",
  "Precio",
  "precio",
  "PRECIO",
])
  .addAnswer(["Esta es la lista de precios actualizada"], {
    media: "https://i.imgur.com/kQdMoNK.png",
  })
  .addAnswer(
    [
      "*Recuerda que los precios pueden variar según el largo del cabello, a continuación, te dejo una tabla de precios:*",
    ],
    { media: "https://i.imgur.com/AonMIVr.png" }
  )
  .addAnswer(["Para agendar, escribe *Cita*"], null, null, [hijo_citas]);

const hijoUñasPrecio = addKeyword(["Uñas", "uñas"])
  .addAnswer([
    "Los precios para las uñas son los siguientes:\n",
    "- Manicura con gel *$250*\n",
    "- Gel 21 días *$150*\n",
    "- Uñas acrílicas *$280*\n",
    "- Acripie *$250*\n",
    "- Capping *$250*\n",
    "- Pedicura *$350*\n",
    "- Soft Gel *$300*",
  ])
  .addAnswer(["Para agendar, escribe *Cita*"], { delay: 500 }, null, [
    hijo_citas,
  ]);

const hijoCabelloPrecio = addKeyword(["Cabello", "cabello", "CABELLO"])
  .addAnswer([
    "Los precios para el servicio del *Cabello* son los siguientes:\n*",
    "- Alisado Keratina&botox *$250*\n",
    "- Alisado Japones *$250*\n",
    "- Lifting *$250*",
  ])
  .addAnswer(
    [
      "*Recuerda que los precios pueden variar según el largo del cabello, a continuación, te dejo una tabla de precios: *",
    ],
    { media: "https://i.imgur.com/AonMIVr.png" }
  )
  .addAnswer(["Para Agendar escribe *Cita*"], { delay: 500 }, null, [
    hijo_citas,
  ]);

const hijoPestañasPrecios = addKeyword([
  "Pestañas",
  "pestañas",
  "PESTAÑAS",
  "Pestaña",
  "pestaña",
  "PESTAÑA",
])
  .addAnswer([
    "El precio del servicio de *pestañas* es el siguiente:\n",
    "- Laminado de Cejas *$150*\n",
    "- Cejas 4K y HD *$250*\n",
    "- Pestañas Volumen *$600*\n",
    "- Pestañas híbridas *$500*\n",
    "- Pestañas M.Volumen *$750*",
  ])
  .addAnswer(["Para Agendar escribe *Cita*"], null, null, [hijo_citas]);

const hijo_Servicios = addKeyword([
  "Servicios",
  "servicios",
  "Servicio",
  "servicio",
  "SERVICIOS",
  "SERVICIO",
])
  .addAnswer(["*Pestañas* 👁️"])
  .addAnswer(["*Uñas* 💅🏻"])
  .addAnswer(["*Cabello* 🪮"])
  .addAnswer(
    [
      "*Si quieres saber el precio de algún servicio, escribe el nombre del servicio*",
    ],
    null,
    null,
    [hijoUñasPrecio, hijoCabelloPrecio, hijoPestañasPrecios]
  );

const flujoPrincipal = addKeyword([
  "hola",
  "Hola",
  ".",
  "HOLA",
  "Menu",
  "menu",
  "MENU",
])
  .addAnswer(["😀 Hola, mi nombre es *Janth*, soy un bot 😀"])
  .addAnswer(["¿En que puedo ayudarte?"])
  .addAnswer(
    ["*Servicios*", "*Citas* 📝", "*Precios* 💲 "],
    { delay: 1000 },
    null,
    [hijo_Precios, hijo_citas, hijo_Servicios]
  );

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flujoPrincipal]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();
//base-baileys-memory
//Configurado por MR360
