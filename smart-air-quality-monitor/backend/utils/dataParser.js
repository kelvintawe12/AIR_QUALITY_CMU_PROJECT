module.exports.parse = (line) => {
  const dataLine = line.trim();
  if (!dataLine || !dataLine.includes('|')) return null;

  const parts = dataLine.split('|').map(p => p.trim());
  if (parts.length < 6) return null;

  try {
    return {
      mq135: parseInt(parts[0]),
      mq7: parseInt(parts[1]),
      temperature: parseFloat(parts[2].replace('°C', '')),
      humidity: parseFloat(parts[3].replace('%', '')),
      aqStatus: parts[4],
      coStatus: parts[5]
    };
  } catch (err) {
    console.error('Parse error:', err);
    return null;
  }
};


