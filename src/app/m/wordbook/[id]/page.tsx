import { WordbookDetail } from './wordbook-detail'

// 假设我们有一个获取单词书详情的函数
async function getWordbookDetails(id: string) {
  return {
    id,
    name: '我的自定义单词书',
    wordCount: 50,
    lastUpdated: '2023-05-15'
  }
}

type Params = Promise<{id: string}>

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const wordbook = await getWordbookDetails(params.id)
  
  return <WordbookDetail wordbook={wordbook} />
}

