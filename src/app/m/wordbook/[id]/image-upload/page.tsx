import { ImageUploadForm } from './image-upload-form'

// 假设我们有一个获取单词书详情的函数
async function getWordbookDetails(id: string) {
  return {
    id,
    name: '我的自定义单词书'
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const wordbook = await getWordbookDetails(params.id)
  
  return <ImageUploadForm wordbook={wordbook} />
}

