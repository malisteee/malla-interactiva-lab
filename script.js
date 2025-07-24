const contenedor = document.getElementById("contenedor-malla");

const semestres = [
  // 1er año
  [
    "Química general y orgánica",
    "Antropología",
    "Introducción a la tecnología médica",
    "Biología celular",
    "Matemáticas básica",
    "Integrado en habilidades científicas para la tecnología médica"
  ],
  [
    "Bioquímica general",
    "Morfología básica",
    "Ética",
    "Tecnología médica en el equipo de salud",
    "Bioseguridad y procedimientos de apoyo diagnóstico",
    "Psicología de atención al paciente"
  ],
  // 2do año
  [
    "Integrado fisiología- fisiopatologia farmacología 1",
    "Salud poblacional",
    "Inmunología",
    "Bioanálisis instrumental y clínico"
  ],
  [
    "Integrado fisiología- fisiopatologia farmacología 2",
    "Bioética",
    "Epidemiología",
    "Inmunología clínica",
    "Microbiología para laboratorio clínico",
    "Hito evaluativo integrativo"
  ],
  // 3er año
  [
    "Persona y sociedad",
    "Bioestadistica",
    "Bioquímica clínica",
    "Infectologia clínica",
    "Parasitología humana"
  ],
  [
    "Gestión en equipos para el alto desempeño",
    "Electivo 1: formación integral",
    "Diagnóstico bioquímico",
    "Diagnóstico microbiológico",
    "Diagnóstico parasitológico"
  ],
  // 4to año
  [
    "Electivo 2: formación profesional",
    "Metodología de la investigación",
    "Hematología clínica",
    "Inmunohematología",
    "Diagnóstico molecular clínico"
  ],
  [
    "Electivo 3: formación profesional",
    "Electivo 1",
    "Diagnóstico hematológico",
    "Medicina transfusional",
    "Salud digital",
    "Hito evaluativo integrado interprofesional"
  ],
  // 5to año
  [
    "Gestión de carrera y desarrollo profesional",
    "Taller de investigación aplicado en tecnología médica en laboratorio clínico",
    "Electivo 2",
    "Electivo 3",
    "Gestionar las preferencias y acreditación en laboratorio clínico"
  ],
  ["Internado"]
];

const prereq = {
  // sem1
  "Bioquímica general": ["Química general y orgánica"],
  "Ética": ["Antropología"],
  "Tecnología médica en el equipo de salud": ["Introducción a la tecnología médica"],
  // sem3
  "Integrado fisiología- fisiopatologia farmacología 1": ["Bioquímica general"],
  "Inmunología": ["Morfología básica"],
  "Bioanálisis instrumental y clínico": ["Bioquímica general"],
  // sem4
  "Integrado fisiología- fisiopatologia farmacología 2": ["Integrado fisiología- fisiopatologia farmacología 1"],
  "Epidemiología": ["Salud poblacional"],
  "Inmunología clínica": ["Inmunología"],
  "Microbiología para laboratorio clínico": ["Inmunología"],
  "Hito evaluativo integrativo": ["Bioquímica general","Morfología básica","Ética","Tecnología médica en el equipo de salud"],
  // sem5
  "Persona y sociedad": ["Ética"],
  "Bioestadistica": ["Matemáticas básica"],
  "Bioquímica clínica": ["Bioanálisis instrumental y clínico"],
  "Infectologia clínica": ["Microbiología para laboratorio clínico"],
  "Parasitología humana": ["Microbiología para laboratorio clínico"],
  // sem6
  "Diagnóstico bioquímico": ["Bioquímica clínica"],
  "Diagnóstico microbiológico": ["Infectologia clínica"],
  "Diagnóstico parasitológico": ["Parasitología humana"],
  // sem7
  "Hematología clínica": ["Diagnóstico bioquímico"],
  "Inmunohematología": ["Inmunología clínica"],
  "Diagnóstico molecular clínico": ["Inmunología clínica"],
  // sem8
  "Diagnóstico hematológico": ["Hematología clínica"],
  "Medicina transfusional": ["Inmunohematología"],
  "Hito evaluativo integrado interprofesional": ["Diagnóstico bioquímico","Diagnóstico microbiológico","Diagnóstico parasitológico","Hematología clínica"]
  // sem10
  // Internado prerrequisito aprobar sem 7 y 8 -> requiere todos anteriores de sem7 y sem8
};

let estado = JSON.parse(localStorage.getItem("labEstado")) || {};

function crearBoton(ramo) {
  const b = document.createElement("button");
  b.className = "ramo";
  b.innerText = ramo;
  if (estado[ramo]) b.classList.add("completado");
  const pres = prereq[ramo];
  if (pres && !pres.every(p => estado[p])) b.classList.add("bloqueado");
  b.onclick = () => {
    if (b.classList.contains("bloqueado")) return;
    b.classList.toggle("completado");
    estado[ramo] = b.classList.contains("completado");
    localStorage.setItem("labEstado", JSON.stringify(estado));
    render();
  };
  return b;
}

function progreso() {
  const tot = document.querySelectorAll(".ramo").length;
  const done = document.querySelectorAll(".ramo.completado").length;
  const pct = Math.round(done*100/tot);
  document.getElementById("progreso-barra").style.width = pct + "%";
  document.getElementById("progreso-texto").innerText = pct + "% completado";
}

function render() {
  contenedor.innerHTML = "";
  semestres.forEach((s,i)=>{
    const d = document.createElement("div");
    d.className = "semestre";
    const t = document.createElement("h2");
    t.innerText = `Semestre ${i+1}`;
    d.appendChild(t);
    s.forEach(r=>d.appendChild(crearBoton(r)));
    contenedor.appendChild(d);
  });
  progreso();
}

render();
