<!-- ページ共通の内容 -->

<template>
  <div id="">
    
    <header>
      <v-app id="inspire">
        <v-app-bar app color="blue">
            <nuxt-link to="/"><v-toolbar-title class="white--text"><fa :icon="faHome" /> chobilog</v-toolbar-title></nuxt-link>
        </v-app-bar>
        <v-content style="padding-top:100px">
          <div id="full">
            <!-- コンテンツはここに入れる -->
            <!-- default.vueで更新される内容は固定 -->
            <!-- pages/index.vueからのcomponents/Item.vue を読み込み -->
            <nuxt />
          </div><!-- #fullのタグ -->
        </v-content>
        <!-- appがあると固定になる -->
        <v-card style="height:50px">
          <v-footer color="blue" app absolute >
            <span class="white--text">&copy; chobilog</span>
          </v-footer>
        </v-card>
      </v-app>
    </header>
  </div>
</template>


<script>
// 全体に適用したい場合はこのCSSを使う
// import '@/assets/css/common.css'
import { faHome } from '@fortawesome/free-solid-svg-icons'

export default {
    computed: {
    faHome () {
      return faHome
    },
  },
}

</script>

<style>

#full {
  width: 90%;
  text-align: center;
  margin: auto;
}
/* プロフィールカードに付けてるクラスだけど意味なさげ */
.profile-wrapper{
  float: left;
}
.card-botton-wrapper{
  display: flex;
}
button:focus {
  outline: none;
}
.card-wrapper {
  display: flex;
}

</style>

