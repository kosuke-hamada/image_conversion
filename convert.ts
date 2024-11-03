import { readdir, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';
import { existsSync } from 'node:fs';

const INPUT_DIR = './images';
const OUTPUT_DIR = './output';

async function convertToWebP() {
  try {
    // 出力ディレクトリが存在しない場合は作成
    if (!existsSync(OUTPUT_DIR)) {
      await mkdir(OUTPUT_DIR);
    }

    // ディレクトリ内のファイルを取得
    const files = await readdir(INPUT_DIR);
    
    // 画像ファイルのみをフィルタリング
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png)$/i.test(file)
    );

    for (const file of imageFiles) {
      const inputPath = join(INPUT_DIR, file);
      const outputPath = join(OUTPUT_DIR, `${file.split('.')[0]}.webp`);

      // sharpを使用してWebPに変換
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);

      console.log(`変換完了: ${file} → ${outputPath}`);
    }

    console.log('すべての変換が完了しました！');
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
}

// プログラムの実行
convertToWebP();