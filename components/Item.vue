<template>
  <div class="card-a-wrapper">
    <v-card class="mx-auto" width="300" height="400" :elevation="10">
      <div class="img-wrapper" style="background-color:rgba(2, 150, 255, 0.1);text-align:center; position: relative;">
        <!-- カテゴリーリンク -->
        <nuxt-link :to="{ name: 'category-id', params: { id: work.fields.category.sys.id } }">
          <div style="position: absolute;top:5px;left:10px;font-weight: bold;">
            <fa :icon="faClip" /> {{ work.fields.category.fields.name }}
            <!-- カテゴリ項目は、Categoryタイプの別のデータを参照するという形式で設定されています。そのため、カテゴリ名を表示させるには、work.fields.categoryでカテゴリの項目を取得したのち、さらにfields.nameと続けることで、該当のカテゴリデータのnameという項目の値を取得する必要がある -->
          </div>
        </nuxt-link>
        <img :src=" work.fields.image.fields.file.url " style="height:200px;margin-top:10px;border-radius:5px;" >
      </div>
      <v-card-title class="black--text">
        <!-- タイトルリンク -->
        <nuxt-link :to=" '/work/' + work.fields.slug ">
          <h3>{{ work.fields.title }}</h3>
        </nuxt-link>
      </v-card-title>
      <v-card-subtitle class="pb-0"></v-card-subtitle>
      <v-card-text><fa :icon="faInfo" /> {{ work.fields.subtitle }}</v-card-text>
      <div class="card-botton-wrapper">
        <!-- タグリンク。<nuxt-link>ではなく、クリックアクションによるページ遷移に挑戦。Vue.jsでは所定のHTMLタグに@click="関数"を追加することで、その要素をクリックした場合に発動する関数を指定できる。ページ遷移のための関数は$router.push('遷移先')-->
        <li 
          v-for="tag in work.fields.tag"
          :key="tag.sys.id"
          style="list-style: none;margin:0px;">
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
    </v-card>
  </div>
</template>

<script>
import { faPaperclip,faInfoCircle } from '@fortawesome/free-solid-svg-icons'
// index.vueから変数workを取得
export default {
  props: ['work'],
  computed: {
    faClip () {
      return faPaperclip
    },
    faInfo () {
      return faInfoCircle
    }
  }
}
</script>

<style scoped>
  .image{
    width: 30px;
  }
  .card-a-wrapper {
    margin: 20px;
    position: relative;
  }
  .card-botton-wrapper{
    position: absolute;
    top: 350px;
    left: 0;
  }
</style>