import React from 'react';
import satori from 'satori';
import * as fs from 'fs/promises';

export default async function genImage() : Promise<string> {

  const font = await fs.open('./static/fonts/OperatorMono-Book.otf');
  const data = await font.readFile();

  const svg = await satori(
    <div>
      hello, world
    </div>,
    {
      width: 600, 
      height: 400,
      fonts: [{
        name: 'Operator Mono',
        data,
      }]
    }
  );

  return svg;
};