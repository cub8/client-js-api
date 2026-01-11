document.addEventListener("alpine:init", () => {
  Alpine.data("clientList", () => ({
    clients: [],
    error: null,
    showFilters: false,
    filters: {
      firstNameEq: "",
      firstNameIn: "",
      lastNameEq: "",
      lastNameIn: "",
      peselEq: "",
      peselIn: "",
      statusEq: "",
      statusIn: "",
    },

    async init() {
      await this.loadClients()
    },

    toggleFilters() {
      this.showFilters = !this.showFilters
    },

    async applyFilters() {
      const params = new URLSearchParams()
      const fields = ["firstName", "lastName", "pesel", "status"]

      fields.forEach((field) => {
        const eqVal = (this.filters[`${field}Eq`] || "").trim()
        if (eqVal) params.append(`${field}Eq`, eqVal)

        const inVal = (this.filters[`${field}In`] || "").trim()
        if (inVal) {
          inVal.split(",").map((v) => v.trim()).filter((v) => v)
            .forEach((val) => {
              params.append(`${field}In`, val)
            })
        }
      })

      await this.loadClients(params)
    },

    clearFilters() {
      Object.keys(this.filters).forEach((key) => this.filters[key] = "")
      this.loadClients()
    },

    async loadClients(params = new URLSearchParams()) {
      try {
        const response = await fetch(`/api/clients?${params.toString()}`)
        console.log(response)
        const data = await response.json()

        if (data.error) {
          this.error = data.error
          this.clients = []
        } else {
          this.clients = data
          this.error = null
        }
      } catch(err) {
        console.log(err)
        this.error = err.message
        this.clients = []
      }
    },

    async deleteClient(id) {
      if (!confirm("Are you sure you want to delete this client?")) return

      try {
        const response = await fetch(`/api/client/${id}`, { method: "DELETE" })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || "Failed to delete client")
        }

        await this.loadClients()
      } catch(err) {
        alert(this.formatError(err))
      }
    },

    formatIntegrations(client) {
      return client.integrations?.map((i) => i.type).join(", ") || ""
    },

    formatError(err) {
      return typeof err === "object" ? JSON.stringify(err, null, 2) : err
    },
  }))
})
