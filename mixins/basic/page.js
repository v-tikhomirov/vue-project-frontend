export default {
  methods: {
    switchTo(tab) {
      Object.keys(this.tabs).forEach(key => {
        this.tabs[key] = false;
      });
      this.tabs[tab] = true;
    }
  }
}
