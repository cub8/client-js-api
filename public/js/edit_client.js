document.addEventListener("alpine:init", () => {
  Alpine.data("updateClientForm", () => ({
    form: {
      id: null,
      firstName: "",
      lastName: "",
      pesel: "",
      note: "",
    },
    error: null,
    success: false,
    loading: true,

    async init() {
      const params = new URLSearchParams(window.location.search)
      const id = params.get("id")

      if (!id) {
        this.error = "No client ID provided."
        this.loading = false
        return
      }

      try {
        const response = await fetch(`/api/client/${id}`)
        if (!response.ok) throw new Error("Failed to load client")

        const client = await response.json()
        this.form = {
          id: client.id,
          firstName: client.firstName,
          lastName: client.lastName,
          pesel: client.pesel,
          note: client.note || "",
        }
      } catch(err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async submitForm() {
      this.error = null
      this.success = false

      try {
        const response = await fetch(`/api/client/${this.form.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: this.form.firstName,
            lastName: this.form.lastName,
            pesel: this.form.pesel,
            note: this.form.note,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error ? JSON.stringify(data.error) : "Failed to update client")
        }

        this.success = true
      } catch(err) {
        this.error = err.message
      }
    },
  }))
})
