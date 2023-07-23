import Header from "./components/Header";
import { Translate } from "@google-cloud/translate/build/src/v2";

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

export default function Home({ data }) {
  console.log('data', data);

  return (
    <div className='w-full h-screen flex flex-col'>
      <Header />
      <div className="w-full h-full flex flex-col items-center pt-[80px]">
        <div className='w-[250px] h-[300xp] bg-white p-3'>
          <div className='w-full h-[200px] overflow-hidden'>
            <img src={data.image} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
          </div>
          <div className='w-full overflow-hidden font-medium font-serif'>
            <p className='text-black'>{data.about}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const data = {
    image: 'https://fostervictor.com/wp-content/uploads/2019/12/AtomicHabits_1book-768x993.png',
    about: `Atomic Habits is the most comprehensive and practical guide on how to create good habits, break bad ones, and get 1 percent better every day. I do not believe you will find a more actionable book on the subject of habits and improvement. If you're having trouble changing your habits, the problem isn't you.`
  }

  const translate = new Translate({
    credentials: credentials,
    projectId: credentials.project_id
  })

  const translateText = async (text, language) => {
    try {
      let [response] = await translate.translate(text, language)
      return response;
    } catch (error) {
      console.log('error found in detect', error);
      return 0;
    }
  }
  const targetLanguage = 'hi';

  const translatedAbout = await translateText(data.about, targetLanguage);

  const translatedData = {
    ...data,
    about: translatedAbout,
  };

  return {
    props: {
      data: translatedData
    }
  }
}
