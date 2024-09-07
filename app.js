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
    "Tu sita sera confirmada en unos instantes, gracias por tu preferencia 😊",
  ])
  .addAnswer([
    "Recuerda que para proceder con la confirmación de tu cita tienes que hacer un depósito de *$100 MX* a la siguiente cuenta: ",
  ])
  .addAnswer(["*0123456789*"])
  .addAnswer([
    "Recuerda despues de hacer el depósito, madar tu comprobante gracias 😊",
  ]);

const hijo_citas = addKeyword(["Citas", "citas", "Cita", "Cita"])
  .addAnswer(["Para agendar una *Cita* introduce tu: "])
  .addAnswer(["*Nombre*"])
  .addAnswer(["*Fecha*"])
  .addAnswer(["*Telefono*"])
  .addAnswer(["*Nombre del Servicio*"])
  .addAnswer(["*La hora se te asignara*"])
  .addAnswer(["Despues escribe *Agendar*"], null, null, [citasConfirmacion]);

const hijo_Precios = addKeyword([
  "Precios",
  "precios",
  "PRECIOS",
  "Precio",
  "precio",
  "PRECIO",
])
  .addAnswer(["Esta es la lista de precios"], {
    media: "https://i.imgur.com/PF1UbbS.jpeg",
  })
  .addAnswer(["Para Agendar escribe *Cita*"], null, null, [hijo_citas])
  .addAnswer(["_Si deseas regresar al Inicio escribe:_ *Hola*"]);

const hijoUñasPrecio = addKeyword(["Uñas", "uñas"])
  .addAnswer(
    [
      "Loprecios para las uñas son los siguientes:\n",
      " - Manicura con gel *$250*\n",
      "- Gel 21 días *$150*\n",
      "- Uñas acrílicas *$280*\n",
      "- Acripie *$250*\n",
      "- Capping *$250*\n",
      "- Pedicura *$350*\n",
      "- Soft Gel *$300*\n",
      "Para Agendar escribe Cita",
    ],
    [hijo_citas]
  )

  .addAnswer(["Para Agendar escribe *Cita*"], null, null, [hijo_citas]);

const hijoCabelloPrecio = addKeyword(["Cabello", "cabello", "CABELLO"])
  .addAnswer([
    "Los precios para el servicio de el *Cabello son lo siguientes:*",
  ])
  .addAnswer(["Alisado Keratina&botox *$250*"])
  .addAnswer(["Alisado Japones *$250*"])
  .addAnswer(["Lifting *$250*"])
  .addAnswer(["Para Agendar escribe *Cita*"], null, null, [hijo_citas]);

const hijoPestañasPrecios = addKeyword([
  "Pestañas",
  "pestañas",
  "PESTAÑAS",
  "Pestaña",
  "pestaña",
  "PESTAÑA",
])
  .addAnswer(["El precio del servicio de pestaña son los siguienmtes:"])
  .addAnswer(["Laminado de Cejas *$150*"])
  .addAnswer(["Cejas 4K y HD *$250*"])
  .addAnswer(["Pestañas Clasicas *$400*"])
  .addAnswer(["Pestañas Volumen *$600*"])
  .addAnswer(["Pestañas híbridas *$500*"])
  .addAnswer(["Pestañas M.Volumen *$750*"])
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
      "*Siquieres saber el precio de algún servicio escribe el nombre del servicio*",
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
  .addAnswer(["😀 Hola, mi nombre es *Jantb*, soy un bot 😀"])
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
