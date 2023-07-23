import { GetServerSidePropsContext } from "next";
import Header from "./components/Header";
import { Translate } from "@google-cloud/translate/build/src/v2";
import bookData from '../public/data.json'

const credentials = {
  type: process.env.GOOGLE_TRANSLATE_ACCOUNT_TYPE,
  project_id: process.env.GOOGLE_TRANSLATE_PROJECT_ID,
  private_key_id: process.env.GOOGLE_TRANSLATE_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_TRANSLATE_PRIVATE_KEY,
  client_email: process.env.GOOGLE_TRANSLATE_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_TRANSLATE_CLIENT_ID,
  auth_uri: process.env.GOOGLE_TRANSLATE_AUTH_URI,
  token_uri: process.env.GOOGLE_TRANSLATE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GOOGLE_TRANSLATE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.GOOGLE_TRANSLATE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.GOOGLE_TRANSLATE_UNIVERSE_DOMAIN
}

export default function Home({ data }: any) {
  return (
    <div className='w-full h-screen flex flex-col'>
      <Header />
      <div className="w-full h-full flex flex-col items-center pt-[80px]">
        <div className="w-full h-auto flex gap-3 flex-row justify-center flex-wrap">
          {data.map((item: any, index: number) => (
            <div className='w-[250px] max-h-[500px] bg-white p-3' key={index}>
              <h1 className="text-center text-2xl font-bold underline text-[#a03131] mb-3 truncate">{item.title}</h1>
              <div className='w-full h-[200px] overflow-hidden mb-4'>
                <img src={item.image} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
              </div>
              <div className='w-full overflow-hidden font-medium font-serif'>
                <p className='text-black overflow-hidden' style={{display: '-webkit-box', WebkitLineClamp: 6, WebkitBoxOrient: 'vertical'}}>{item.about}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ locale }: GetServerSidePropsContext) {

  const data = bookData;

  const translate = new Translate({
    credentials: credentials,
    projectId: credentials.project_id
  })

  const translateText = async (text: string) => {
    try {
      let [response] = await translate.translate([text], locale || 'en')
      return response;
    } catch (error) {
      console.log('error found in detect', error);
      return 0;
    }
  }

  const translatedData = await Promise.all(data.map(async (item) => {
    const translatedTitle = await translateText(item.title);
    const translatedAbout = await translateText(item.about);

    return {
      ...item,
      title: translatedTitle,
      about: translatedAbout,
    };
  }));

  return {
    props: {
      data: translatedData
    }
  }
}
