export async function parsePCD(file: File): Promise<Float32Array> {
  const fileContent = await file.text();

  // ヘッダーとデータを分割
  const [headerContent, dataContent] = fileContent.split(/\n(?<=DATA ascii\n)/);

  // ヘッダーをパース
  const header = parseHeader(headerContent);

  // データをパース
  const points = parseData(dataContent, header);

  return points;
}

function parseHeader(headerContent: string) {
  const header: { [key: string]: any } = {};
  const lines = headerContent.split('\n');
    
  for (const line of lines) {
    if (line[0] === '#') continue;
    const [key, value] = line.split(' ', 2);
    header[key] = value;
  }
  
  return header;
}

function parseData(dataContent: string, header: any): Float32Array {
  if (header.DATA === 'ascii') {
    const lines = dataContent.split('\n');
    const points = [];

    for (const line of lines) {
      if (line.trim() === '') continue;
      const values = line.split(/\s+/).map(parseFloat);

      // x, y, zの値のみを取得（他のフィールドは無視）
      const x = values[0];
      const y = values[1];
      const z = values[2];

      points.push(x, y, z);
    }
    return new Float32Array(points);
  } else {
    throw new Error('Only ASCII format is supported.');
  }
}
