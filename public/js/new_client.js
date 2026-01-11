document.addEventListener("alpine:init", () => {
  Alpine.data("createClientForm", () => ({
    form: {
      firstName: "",
      lastName: "",
      pesel: "",
      note: "",
    },
    error: null,
    success: false,

    async submitForm() {
      this.error = null
      this.success = false

      try {
        const response = await fetch("/api/clients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.form),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error ? JSON.stringify(data.error) : "Failed to create client")
        }

        this.success = true
        this.form = { firstName: "", lastName: "", pesel: "", note: "" } // Reset form
      } catch(err) {
        this.error = err.message
      }
    },
  }))
})
