async function getStat(stat) {
  return fetch(`/${stat}`, { method: 'get' })
    .then((v) => v.json())
    .then((d) => d.data);
}

function setValues({ ...rest }) {
  const items = Object.keys(rest);
  items
    .map((item) => [item, document.querySelector(`[data-stat='${item}'`)])
    .forEach(([item, element]) => {
      element.textContent = rest[item];
      console.log(item, element);
    });
}

async function checkStats() {
  const [temp, cpu, gpu, volts, throttled /* wifiSpeed, wifiSignal */] =
    await Promise.all(
      [
        'temp',
        'cpu',
        'gpu',
        'volts',
        'throttled' /* 'wifi-speed', 'wifi-signal' */,
      ].map((item) => getStat(item)),
    );
  setValues({
    temp,
    cpu,
    gpu,
    volts,
    throttled,
    /* 'wifi-speed': wifiSpeed,
    'wifi-signal': wifiSignal, */
  });
  return Promise.resolve();
}

(async () => {
  setInterval(checkStats, 5000);
  return checkStats();
})();
