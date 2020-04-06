<!-- 作品情報を取得する -->

<template>
  <div>
    <div style="margin:auto;width:70%;background-color:rgba(2, 150, 255, 0.1);text-align:center; position: relative;">
        <!-- カテゴリーリンク -->
        <nuxt-link :to="{ name: 'category-id', params: { id: work.fields.category.sys.id } }">
          <div style="position: absolute;top:5px;left:10px;font-weight: bold;">
            <fa :icon="faClip" /> {{ work.fields.category.fields.name }}
            <!-- カテゴリ項目は、Categoryタイプの別のデータを参照するという形式で設定されています。そのため、カテゴリ名を表示させるには、work.fields.categoryでカテゴリの項目を取得したのち、さらにfields.nameと続けることで、該当のカテゴリデータのnameという項目の値を取得する必要がある -->
          </div>
        </nuxt-link>
        <img :src=" work.fields.image.fields.file.url " style="width:60%;margin-top:10px;border-radius:5px;" >
      </div>

    <h1 class="text-center text-4xl">{{ work.fields.title }}</h1>
    <p class="text-center text-sm">{{ work.fields.subtitle }}</p>
    
    <div class="my-10">
      <p v-if="work.fields.url" class="text-xs">
        <fa-layers full-width class="mr-1">
          <fa :icon="faLink" />
        </fa-layers>
        {{ work.fields.url }}
      </p>
      <p v-if="work.fields.gitHub" class="text-xs">
        <fa-layers full-width class="mr-1">
          <fa :icon="faGithub" />
        </fa-layers>
        {{ work.fields.gitHub }}
      </p>
    </div>
    <!-- v-htmlディレクティブはデータをHTML形式で表示してくれる -->
    <div class="content" v-html="$md.render(work.fields.content)"></div>

    <div class="card-botton-wrapper" style="width:70%;margin:auto">
      <li 
          v-for="tag in work.fields.tag"
          :key="tag.sys.id"
          style="list-style: none;text-align:center;">
          <!-- 以下liタグに入れればできるらしいがじぶんは実装できず。 -->
          <!-- @click="$router.push('/tag/'+tag.sys.id)"  -->
          <v-chip class="ma-2" label>
            <nuxt-link :to=" '/tag/' + tag.sys.id ">
            <!-- タグは１つの記事に対して複数登録できるようにしていたことに注意してください。work.fields.tagには各タグが配列形式で入っているので、各タグをtagに順番に入れていくには次のようにします。-->
            {{ tag.fields.name }}
            <!-- タグ項目も上でみたカテゴリ項目と同様、Tag形式の別のデータを参照する形で設定されている -->
            </nuxt-link>
          </v-chip>
        </li>
    </div>
  </div>
</template>

<script>
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faPaperclip,faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { createClient } from '~/plugins/contentful.js'

const client = createClient()
export default { 
  asyncData({params}) {
    return Promise.all([
      client.getEntries({
        'content_type': 'work',
        'fields.slug': params.slug // スラッグというフィールドの値がパス内のslugというパラメータと合致する記事データを取得※今回はURLに含まれるslugというパラメータをもとに、該当する記事を取得する必要があるので、asyncDataの引数としてparamsを渡します。ここで注意したいのは、asyncDataに渡す引数はcontextというオブジェクト形式にする必要がある
      })
    ]).then(([works]) => { //実質1つだがworks配列としてデータを受け取る
      return {
        work: works.items[0] // 取得した配列データの初めの１つを変数workに入れる
      }
    }).catch(console.error)
  },
  computed: {
    faLink () {
      return faLink
    },
    faGithub () {
      return faGithub
    },
    faClip () {
      return faPaperclip
    },
    faInfo () {
      return faInfoCircle
    }
  }
}
</script>

<style>
.content {
  text-align: left;
  width: 70%;
  margin: auto;
}
.content h1 {
  font-weight: bold;
  font-size: 1.2rem;
  margin: 25px 0;
  border-bottom: 2px solid #000;
}
.content h2 {
  font-weight: bold;
  font-size: 1rem;
  margin: 20px 0;
  border-bottom: 1px solid #eee;
}
.content h3 {
  font-weight: bold;
  font-size: .8rem;
  margin: 15px 0;
}
.content a {
  color: blue;
}
.content li {
  list-style: disc;
}
.content code {
  background: #eee;
  padding: 2px;
}
.content pre code {
  background: none;
  padding: 0;
}
.content pre {
  background: #000;
  color: #fff;
  padding: 5px;
}
.content img {
  width: 100%;
}
</style>