<template>
<div>

  <div class="test1">
    <h1>About Page</h1>
    width<input type="text" v-model="width">{{width}}
    halfwidth<input type="text" v-model="halfwidth">{{halfwidth}}
  </div>

  <div class="test2">
    <p>{{count}}回クリック！！</p> <button @click="increment">増やす</button>
  </div>

  <div class="test3">
    <h1>Hello {{ name }}!</h1>
  </div>

</div>
</template>

<script>
export default {
  data(){
    return {
      width: 400,
      count :0,
      name:'masaru'
    }
  },
  asyncData (context) {
    // コンポーネントをロードする前に毎回呼び出されます
    // 名前の通り非同期にすることができます
    // また、返されたオブジェクトはデータオブジェクトとマージされます
    return { name: '' }
  },
  computed: {
    halfwidth: {
      get: function () {return this.width /2},
      set: function (tel) {this.width = tel*2}
    }
  },
  methods: {
    increment: function() {
      this.count += 1 
    } 
  },
}
</script>