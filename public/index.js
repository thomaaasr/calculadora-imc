const btn = document.getElementById('calcular');
const saida = document.getElementById('saida');

function cssClass(classificacao) {
  switch (classificacao) {
    case 'magreza': return 'tag magreza';
    case 'eutrofia': return 'tag eutrofia';
    case 'sobrepeso': return 'tag sobrepeso';
    case 'obesidade grau I': return 'tag obesidadeI';
    case 'obesidade grau II': return 'tag obesidadeII';
    case 'obesidade grau III': return 'tag obesidadeIII';
    default: return 'tag';
  }
}

btn.addEventListener('click', async () => {
  const peso = document.getElementById('peso').value;
  const altura = document.getElementById('altura').value;

  saida.style.display = 'none';

  if (!peso || !altura) {
    saida.style.display = 'block';
    saida.innerHTML = "<strong>Erro:</strong> Preencha todos os campos.";
    return;
  }

  try {
    const resp = await fetch('/api/imc', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ peso, altura })
    });

    const data = await resp.json();

    if (!resp.ok) {
      saida.style.display = 'block';
      saida.innerHTML = `<strong>Erro:</strong> ${data.error}`;
      return;
    }

    saida.style.display = 'block';
    saida.innerHTML = `
      <div><strong>IMC:</strong> ${data.imc}</div>
      <div style="margin-top:8px;">
        <span class="${cssClass(data.classificacao)}">${data.classificacao}</span>
      </div>
    `;
  } catch (error) {
    saida.style.display = 'block';
    saida.innerHTML = `<strong>Erro:</strong> falha na requisição.`;
  }
});