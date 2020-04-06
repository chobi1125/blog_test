<template>

<!-- Itemコンポーネントでビューを作っているので一覧表示のデザインは基本的に同じ。index.vueと違うデータを受け取ってItemコンポーネントにprops、表示を変えているだけ。 -->

  <div class="card-wrapper">
    <Item 
      v-for="work in works" 
      :key="work.sys.id"
      :work="work"
    />
  </div>
</template>

<script>
import Item from '@/components/Item'
import { createClient } from '~/plugins/contentful.js'
const client = createClient()
export default { 
  components: {
    Item
  },
  asyncData ({params}) {
    return Promise.all([
      client.getEntries({
        'content_type': 'work',
        'fields.tag.sys.id': params.id,
        //idパラメータで指定された特定のタグを持つ記事を取得したい,カテゴリタグに紐づけられたカテゴリデータのIDがURL内のidパラメータと等しい記事が取得される
        order: '-sys.createdAt'
      }),
    ]).then(([works]) => {
      return {
        works: works.items
      }
    }).catch(console.error)
  }
}
</script>