import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card"
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {Button} from "@/components/ui/button.tsx";
import {currentProfile, login} from "@/api/auth";
import {message} from "antd";
import {saveAuth, saveToken} from "@/store/slices/authSlice.ts";
import {useTypedDispatch} from "@/store";
import {AuthTypeEnum} from "@/api/auth/types.ts";
import {useNavigate} from "react-router";

const Login = () => {
    const dispatch = useTypedDispatch()
    const navigate = useNavigate()
    // 用于实现用户登录的方法
    const onFinish = async () => {
        try {
            const {xAuthToken} = await login({
                authType: AuthTypeEnum.USERNAME_PASSWORD,
                credentials: "123456",
                principal: "defaultAdmin"
            })
            dispatch(saveToken(xAuthToken))
            const res = await currentProfile()
            dispatch(saveAuth(res))
            message.success('登录成功')
            navigate('/')
        } catch (e) {
            console.log(e)
            message.error("登录失败")
        } finally {

        }

    }
    return (
        <>
            <Tabs defaultValue="account"
                  className="fixed  w-[400px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account</CardTitle>
                            <CardDescription>
                                Make changes to your account here. Click save when you're done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" defaultValue="Pedro Duarte"/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" defaultValue="@peduarte"/>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => onFinish()}>Save changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="password">
                    <Card>
                        <CardHeader>
                            <CardTitle className={'text-end'}>Password</CardTitle>
                            <CardDescription>
                                Change your password here. After saving, you'll be logged out.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="current">Current password</Label>
                                <Input id="current" type="password"/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new">New password</Label>
                                <Input id="new" type="password"/>
                            </div>
                        </CardContent>
                        <CardFooter className={'justify-end'}>
                            <Button>Save password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </>
    );
};

export default Login;