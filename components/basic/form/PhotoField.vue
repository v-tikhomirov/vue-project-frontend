<template>
  <div>
    <template v-if="!!imageUrl">
      <div class="form-photo" :class="isBig ? 'form-photo--big' : ''">
        <div class="form-photo__img">
          <img :src="mediaUrl + imageUrl" width="330" height="330" :alt="alt">
        </div>
        <div class="form-photo__description">
          <div class="form-photo__btns">
            <button class="btn btn--icon-left form-photo__btn" type="button" aria-label="Delete photo" @click="deleteImage">
              <span class="btn__text">Delete</span>
              <span class="btn__icon">
            <svg width="24" height="24" aria-hidden="true">
              <use xlink:href="#icon-delete"></use>
            </svg>
          </span>
            </button>
            <button class="btn btn--icon-left form-photo__btn" type="button" aria-label="Update photo"  @click="$refs.image.click()">
              <span class="btn__text">Update photo</span>
              <span class="btn__icon">
                <svg width="24" height="24" aria-hidden="true">
                  <use xlink:href="#icon-update"></use>
                </svg>
              </span>
            </button>
          </div>
          <div class="form-photo__text">JPG, JPEG, PNG (up to 5Mb)</div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="img-upload" :class="isBig ? 'form-photo--big' : ''">
        <div class="img-upload__preview" v-if="type === 'avatar'">
          <svg width="82" height="82" aria-hidden="true" v-if="!isBig">
            <use xlink:href="#preview-avatar"></use>
          </svg>
          <svg width="200" height="200" aria-hidden="true" v-else>
            <use xlink:href="#preview-avatar"></use>
          </svg>
        </div><div class="img-upload__preview" v-if="type === 'company' || type === 'temp'">
          <svg data-v-84d0dc62="" width="82" height="82" aria-hidden="true">
            <use data-v-84d0dc62="" xlink:href="#preview-img"></use>
          </svg>
        </div>
        <label class="img-upload__field" @click="$refs.image.click()">
          <span
            class="img-upload__label"> {{ label }}
          </span>
          <span class="img-upload__text">JPG, JPEG, PNG (up to 5Mb)</span>
        </label>
      </div>
    </template>
    <input class="img-upload__input visually-hidden" type="file" accept=".png, .jpeg, .jpg, .gif" @change="updateImage" ref="image">
  </div>
</template>

<script>

export default {
  name: "PhotoField",
  props: {
    isBig: {
      type: Boolean,
      default: false
    },
    src : {
      type: String,
    },
    alt: {
      type: String
    },
    label: {
      type: String,
      default: 'Click to upload an image'
    },
    type: {
      type: String,
      default: 'avatar', // or company
    },
    api: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      company: null,
      uploadedImageSrc: null,
      mediaUrl: process.env.MEDIA_BASE_URL
    }
  },
  watch: {
    uploadedImageSrc() {
      this.$emit('input', this.uploadedImageSrc)
    }
  },
  computed: {
    imageUrl() {
      if(this.src && !this.uploadedImageSrc) return this.src
      else if(this.uploadedImageSrc) return this.uploadedImageSrc
      else return ''
    }
  },
  mounted() {
    if(this.type === 'company') {
      this.$api.company.getDetails().then((res) => {
        if (res.data.success) {
          this.company = res.data.data;
        }
      })
    }
  },
  methods: {
    deleteImage() {
      if(this.type === 'avatar') {
        this.api.removeProfilePicture().then(() => {
          this.$auth.fetchUser()
        })
      }
      if(this.type === 'company') {
        const data = new FormData();
        data.append('logo', "")
        data.append('step', 'logo')
        data.append('id', this.company.id)
        this.api.updateCompany(data).then((res) => {
          if(res.data.success) this.uploadedImageSrc = ""
        })
      }
      if(this.type === 'temp') {
      }
      this.uploadedImageSrc = ''
    },
    updateImage() {
      let image = this.$refs.image.files[0]
      const data = new FormData();
      const headers = { 'Content-Type': 'multipart/form-data' };

      if(this.type === 'avatar') {
        data.append('profile_picture', image);
        this.api.updateProfile(data, headers).then((res) => {
          if(res.data.success) {
            this.uploadedImageSrc = res.data.data.profile_picture
            this.$auth.fetchUser()
          }
        })
      } else if (this.type === 'company') {
        data.append('logo', image)
        data.append('step', 'logo')
        data.append('id', this.company.id)
        this.api.updateCompany(data, headers).then((res) => {
          if(res.data.success) this.uploadedImageSrc = res.data.data.company.logo
        })
      } else if (this.type === 'temp') {
        data.append('image', image)
        this.api.upload(data, headers).then((res) => {
          if(res.data.success) {
            this.uploadedImageSrc = res.data.data.image
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  .form-photo--big .img-upload__preview, .form-photo--big .img-upload__preview svg {
    width: 330px;
    height: 330px;
  }
  .form-photo--big .img-upload__field {
    text-align: center;
  }
</style>
