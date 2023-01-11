<template>
  <div class="custom-textarea" :class="{'is-invalid': errorMessage.key}" data-toolbar>
    <label>
      <span v-if="label" class="custom-textarea__label">{{ label }} <span v-if="required" class="color-red">*</span></span>
      <editor-content class="input-textarea" :class="customClass" :editor="editor"/>
    </label>
    <span v-if="errorMessage.key" class="custom-input__error">{{ $t(errorMessage.key) }}</span>
    <div class="custom-textarea__toolbar">
      <button class="btn btn--only-icon btn--textarea-toolbar" type="button" aria-label="Сhange font to bold" @click="editor.chain().focus().toggleBold().run()">
        <span class="btn__text"></span>
        <span class="btn__icon">
          <svg width="9" height="10" aria-hidden="true">
            <use xlink:href="#letter-b"></use>
          </svg>
        </span>
      </button>
      <button class="btn btn--only-icon btn--textarea-toolbar" type="button" aria-label="Сhange font to italic" @click="editor.chain().focus().toggleItalic().run()">
        <span class="btn__text"></span>
        <span class="btn__icon">
          <svg width="8" height="10" aria-hidden="true">
            <use xlink:href="#letter-i"></use>
          </svg>
        </span>
      </button>
      <button class="btn btn--only-icon btn--textarea-toolbar" type="button" aria-label="Сhange font to underlined" @click="editor.chain().focus().toggleUnderline().run()">
        <span class="btn__text"></span>
        <span class="btn__icon">
          <svg width="10" height="15" aria-hidden="true">
            <use xlink:href="#letter-u"></use>
          </svg>
        </span>
      </button>
      <div class="custom-textarea__divider"></div>
      <button class="btn btn--only-icon btn--textarea-toolbar" type="button" aria-label="Create marked-list" @click="editor.chain().focus().toggleBulletList().run()">
        <span class="btn__text"></span>
        <span class="btn__icon">
          <svg width="19" height="12" aria-hidden="true">
            <use xlink:href="#marked-list"></use>
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import Underline from '@tiptap/extension-underline'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import Placeholder from '@tiptap/extension-placeholder'
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
export default {
  name: "TextareaField",
  components: {
    EditorContent,
  },
  props: {
    label: {
      required: false
    },
    value: {
      required: false,
    },
    id: {
      type: String,
      required: false,
      default: 'input'
    },
    name: {
      type: String,
      required: false,
      default: 'input'
    },
    placeholder: {
      type: String,
      required: false,
    },
    rows: {
      type: [String, Number],
      required: false,
      default: 8
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    errorMessage: {
      required: false,
      default: () => ({})
    }
  },
  data: () => ({
    editor: null,
    customClass: ''
  }),
  watch: {
    value(value) {
      const code = this.editor.getHTML();
      if (code === value) {
        return;
      }
      this.editor.commands.setContent(value);
    }
  },
  mounted() {
    let options = {
      onUpdate: ({ editor }) => {
        this.$emit('input', editor.getHTML());
        this.$emit('change', editor.getHTML());
      },
      onFocus: () => {
        this.customClass = 'textarea-focused';
      },
      onBlur: () => {
        this.customClass = '';
      },
      extensions: [
        StarterKit,
        Underline,
        BulletList,
        ListItem,
        Placeholder.configure({
          placeholder: this.placeholder,
        }),
      ],
    };
    if (this.value) {
      options.content = this.value;
    }
    this.editor = new Editor(options)
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value)
      this.$emit('change', event.target.value)
    }
  }
}
</script>

<style scoped>

</style>
