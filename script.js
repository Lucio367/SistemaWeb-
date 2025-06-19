 import {
  collection, addDoc, getDocs, deleteDoc, updateDoc,
  doc, query, where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from './firebase-config.js';

const webForm = document.getElementById('WebForm');
const listaWeb = document.getElementById('listaWeb');
const BuscarWebs = document.getElementById('BuscarWebs');
const webRef = collection(db, 'Paginas Webs');

webForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const webform = {
    nombre: webform.nombre.value,
    fechaHora: webForm.fechaHora.value,
    creador: webForm.creador.value,
    contacto: {
      email: listaWeb.email.value,
      telefono: webRef.telefono.value
    }
  };
  await addDoc(webRef, { nombre, fechaHora,creador,contacto,email,telefono });
  webForm.reset();
  mostrarWebs();
});

async function mostrarWebs() {
  const contenedor = document.getElementById("listaWebs");
  contenedor.innerHTML = "";
  const snapshot = await getDocs(webRef);
  snapshot.forEach(docu => {
    const data = docu.data();
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h3>${data.nombre}</h3>
      <p><strong>Fecha y Hora:</strong> ${data.fechaHora}</p>
      <p><strong>creador:</strong> ${data.creador}</p>
      <p><strong>Email:</strong> ${data.contacto.email}</p>
      <p><strong>Teléfono:</strong> ${data.contacto.telefono}</p>
      <button onclick="editarWeb('${docu.id}', ${JSON.stringify(data).replace(/"/g, '&quot;')})">Editar</button>
      <button onclick="eliminarWeb('${docu.id}')">Eliminar</button>
    `;
    contenedor.appendChild(div);
  });
}

window.eliminarWeb = async (id) => {
  await deleteDoc(doc(db, "Sistemas Web", id));
  mostrarWebs();
};


window.eliminarWeb = eliminarWeb;

  window.editarweb = (id, datos) => {
    form.nombre.value = datos.nombre;
    form.fechaHora.value = datos.fechaHora;
    form.creador.value = datos.creador;
    form.email.value = datos.contacto.email;
    form.telefono.value = datos.contacto.telefono;
    editando = true;
    idEditando = id;
    form.querySelector("button").textContent = "Actualizar";

  webForm.onsubmit = async (e) => {
    e.preventDefault();
    const nuevonombre = webForm.nombre.value;
    const nuevofechaHora = webForm.fecha.value;
    const nuevocreador = parseInt(webForm.creador.value);
    const nuevoemail = webForm.email.value;
    const nuevotelefono = webForm.telefono.value;

    await updateDoc(doc(db, 'Paginas Webs', id), {
      nombre: nuevonombre,
      fecha: nuevofechaHora,
      creador: nuevocreador,
      email: nuevoemail,
      telefono: nuevotelefono
    
    });

    WebForm.reset();
    WebForm.onsubmit = guardarWeb;
    mostrarWebs();
  };
};

function guardarWeb(e) {
  e.preventDefault();
  // Se reemplaza dinámicamente con función anterior al editar
}

async function BuscarWebs() {
  const texto = BuscarWebs.value.trim();
  if (!texto) return mostrarWebs();

  listaWeb.innerHTML = '';
  const q = query(webRef, where('Paguinas Webs', '==', texto));
  const resultado = await getDocs(q);

  resultado.forEach(docSnap => {
    const webs = docSnap.data();
    const div = document.createElement('div');
    div.innerHTML = `<strong>${webs.nombre}</strong> - ${webs.fecha} (${webs.creador}) - ${webs.email}`;
    listaWeb.appendChild(div);
  });
}

mostrarWebs();
