// interface = formato do objeto
interface User {
  email: string
  age?: number // opcional
}

// uso
const user: User = {
  email: "lucas@email.com"
}