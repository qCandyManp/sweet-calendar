import Button from "@/app/components/general/button"
import Input from "@/app/components/general/form/input"

export default function Login() {
    return (
        <div>
            <h1>Login</h1>
            <form action={authenticate}>
                <Input type="email" name="email" placeholder="Email" required />
                <Input type="password" name="password" placeholder="Password" required />
                <Button type="submit">Login</Button>
            </form>
        </div>
    )
}