
1. [translate with $t prefix](https://vue-i18n.intlify.dev/guide/essentials/syntax.html)
2. [translate with v-t directive](https://vue-i18n.intlify.dev/guide/advanced/directive.html) 
   
## script标签中使用i18n
   ```typescript
   <script>
    import { useI18n } from "vue-i18n";
   const { t } = useI18n();
   t("x.y.z")
   </script>
   ```