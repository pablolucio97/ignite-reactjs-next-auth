import Document, {Html, Head, Main, NextScript} from 'next/document'

export default class MyApp extends Document{
    render(){
        return(
            <Html>
                <Head>
                    <title>NextAuth</title>
                </Head>
                <Main />
                <NextScript />
            </Html>
        )
    }
}