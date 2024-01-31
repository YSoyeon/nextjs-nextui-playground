import { renderToBuffer, Page, View, Text, Document } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const buffer = await renderToBuffer(
    <Document producer="foo" creator="foo" title="App">
      <Page size="A4">
        <View>
          <Text>Hello from app directory</Text>
        </View>
      </Page>
    </Document>
  );

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="app.pdf"`,
    },
  });
}

export async function POST(request: Request) {
  console.log('post request body');
  console.log(request.body);

  return new NextResponse();
}
