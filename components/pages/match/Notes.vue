<template>
  <section class="details__section details__section--notes">
    <h2 class="details__title">Notes</h2>
    <div v-for="(note, index) in notes" >
      <div class="note" v-if="note.is_deleted == 0" :class="index !== 0 ? 'pt23' : ''">
        <div class="note__top-wrapper">
          <picture>
            <source type="image/webp" :srcset="mediaUrl + note.user.profile.profile_picture"><img :src="mediaUrl + note.user.profile.profile_picture" width="37" alt="Photo of Esther Howard">
          </picture>
          <div class="note__name-wrapper">
            <p class="note__user-name">{{ note.user.profile.first_name + ' ' + note.user.profile.last_name }}</p>
            <p class="note__date">24.02.2022</p>
          </div>
          <button class="btn btn--only-icon" type="button" aria-label="Delete note" @click="editNote(note.id,'remove')"><span class="btn__text"></span><span class="btn__icon">
                      <svg width="10" height="10" aria-hidden="true">
                        <use xlink:href="#icon-close"></use>
                      </svg></span>
          </button>
        </div>
        <p class="note__text" v-if="note.message.length > 100 && !notesSM[index]">{{ note.message.substring(0, 100) }} ...</p>
        <p class="note__text" v-else>{{ note.message }}</p>
        <button class="btn note__more-btn" type="button" v-if="note.message.length > 100 && !notesSM[index]" @click="showMore(index)"><span class="btn__text">Show more</span>
        </button>
      </div>
      <div class="note note--no-border" v-else :class="index !== 0 ? 'pt23' : ''">
        <div class="note__text note__text--grey">The note has been deleted</div>
        <button class="btn note__more-btn" type="button" @click="editNote(note.id, 'restore')"><span class="btn__text">Restore</span>
        </button>
      </div>
    </div>
    <div class="custom-textarea">
      <label><span class="custom-textarea__label">New note</span>
        <textarea name="new-note" placeholder="Type here" rows="4" v-model="message"></textarea>
      </label>
    </div>
    <button class="btn btn--long details__btn-textarea" type="button" @click="addNote"><span class="btn__text">Add note</span>
    </button>
  </section>
</template>

<script>
export default {
  name: "Notes",
  props: {
    match_id: {
      type: Number,
      required: true
    },
    notes: {
      required: true
    },
    api: {
      required: true
    }
  },
  data() {
    return {
      message: '',
      mediaUrl: process.env.MEDIA_BASE_URL,
      notesSM: []
    }
  },
  methods: {
    addNote() {
      let data = {
        message: this.message,
        match_id: this.match_id
      }
      this.api.addNote(data).then((res) => {
        if(res.data.success) {
          this.message = ''
          this.$emit('notes-updated')
        }
      })
    },
    editNote(id, type) {
      if(type === "remove") {
        let idx = this.notes.findIndex(note => note.id === id)
        this.notes[idx].is_deleted = 1
      } else {
        let idx = this.notes.findIndex(note => note.id === id)
        this.notes[idx].is_deleted = 0
      }
      this.api.editNote(id, type).then((res) => {
        // this.$emit('notes-updated')
      })
    },
    showMore(index) {
      this.notesSM[index] = true
    }
  }
}
</script>

<style scoped>
  .note__top-wrapper picture{
    height: 37px;
    width: 37px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 13px;
  }
  .note__top-wrapper img {
    height: auto;
  }
  .pt23 {
    padding-top: 23px;
  }
</style>
