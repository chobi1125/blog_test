<template>
 <div class="card-wrapper">
   <!-- Itemコンポーネントに記載。特定のタグを持つ作品の一覧ページや、検索結果一覧ページなどのリストページを追加するため、独立したコンポーネントにしている。 -->
   <!-- index.vue側で取得したworksに含まれる１つ１つの作品データを、Item.vueという別のコンポーネントに渡す処理を書いてる。コンポーネント側にprops -->
   <div class="profile-wrapper" style="margin:20px">
      <!-- カードコンポーネントはここから -->
      <v-card class="mx-auto" width="300" height="400" :elevation="10">
        <div class="img-wrapper" style="background-color:rgba(2, 150, 255, 0.1);text-align:center;">
          <img src="https://chobimusic.com/wp-content/uploads/2020/02/about-me-square.jpg" style="height:200px;margin-top:10px;border-radius:5px;" >
        </div>
        <v-card-title class="black--text">Profile</v-card-title>
        <!-- <v-card-subtitle class="pb-0">1992/11/25</v-card-subtitle> -->
        <v-card-text class="text--primary">
          <p style="margin:0">I am a Programmer in Tokyo.</p>
        </v-card-text>
        <div class="card-botton-wrapper">
          <v-card-actions>
            <a href="https://chobimusic.com/" target="_blank">
              <vs-button :color="colorx" :gradient-color-secondary="colorx2" type="gradient">
                  <fa :icon="faUser" />
                Profile
              </vs-button>
            </a>
          </v-card-actions>
          <v-card-actions>
            <a href="https://twitter.com/masaru_pg" target="_blank">
              <vs-button :color="colorx" :gradient-color-secondary="colorx2" type="gradient">
                  <fa :icon="faTwitter" />
                Twitter
              </vs-button>
            </a>
          </v-card-actions>
          <v-card-actions>
            <a href="https://github.com/chobi1125" target="_blank">
              <vs-button :color="colorx" :gradient-color-secondary="colorx2" type="gradient">
                  <fa :icon="faGithub" />
                GitHub
              </vs-button>
            </a>
          </v-card-actions>
        </div>
      </v-card>
    </div>
   
   <Item 
    v-for="work in works"  
    :key="work.sys.id"
    :work="work"
   />
   <!-- asyncDataの配列worksに含まれる各要素を順番に変数workに入れてる -->
   <!-- v-forを使う場合の注意点は、各要素を特定するためのキーを指定する必要がある。各作品データのIDを使用。 -->
   <!-- Contentfulから取得したデータは、sysとfieldsの２つに分けらる。このうち、各記事データのIDはsysの方に含まれる。そのため、上記のように記述することで作品データのIDを取得できる。 -->
   <!-- workという変数を作ってデータを代入させている。 -->
 </div>
</template>

<script>
import Item from '@/components/Item' //Itemコンポーネントのインポート
// 以下2行でプラグインをインポートし変数に代入
import { createClient } from '~/plugins/contentful.js'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faCode,faUser,faHome } from '@fortawesome/free-solid-svg-icons'

const client = createClient()

export default { 
  data() {
    return {
      keyword: '',
      colorx:'rgb(78, 144, 65)',
      colorx2:'rgb(0, 255, 0)'
    }
  },
  computed: {
    faTwitter () {
      return faTwitter
    },
    faFacebook () {
      return faFacebook
    },
    faGithub () {
      return faGithub
    },
    faCode () {
      return faCode
    },
    faUser () {
      return faUser
    },
    faHome () {
      return faHome
    },

  },
  components: {
    Item
  },
  asyncData() {
    return Promise.all([
      client.getEntries({ //contentfulからデータを取得するには、clientのgetEntries関数を使います。
        'content_type': 'work', // workというContent Typeを持つデータを全て取得し、これらを作成日時（sys.createdAt）順に並べるという処理を行っています。
        order: '-sys.createdAt' // 作成日時順に並べる
      })
    ]).then(([works]) => { //取得したデータをworksという配列で受け取り
      return {
        works: works.items // そこに含まれる記事データ（works.items）を、worksという配列に格納しています。
      } //あとは、テンプレート内でworksをリスト表示させれば、あっという間にトップページの作成完了
    }).catch(console.error)
  }
}
</script>