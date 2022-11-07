<!--
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-11-07 15:50:54
 * @LastEditTime: 2022-11-07 18:00:44
-->
<template>
    <div class="login">
        <a-card title="登录" :bordered="true" style="width: 380px" hoverable>
            <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
                <a-form-item label="Username" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
                    <a-input v-model:value="formState.username" />
                </a-form-item>

                <a-form-item label="VerifyCode" name="verifyCode" :rules="[{ required: true, message: 'Please input your verify code!' }]">
                    <a-input v-model:value="formState.verifyCode" />
                </a-form-item>

                <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
                    <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
                </a-form-item>

                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <a-button type="primary" html-type="submit" @click="login">登录</a-button>
                    <a-button type="primary" html-type="submit" style="margin-left: 20px" @click="getCode">获取验证码</a-button>
                </a-form-item>
            </a-form>
        </a-card>
    </div>
</template>
<script lang="ts" setup>
import { getVerifyCode, loginByPhoneNumber } from '@/api'
import { reactive } from 'vue'
import { message } from 'ant-design-vue'

interface FormState {
    username: string
    verifyCode: string
    remember: boolean
}
const formState = reactive<FormState>({
    username: '',
    verifyCode: '',
    remember: true,
})
const onFinish = (values: any) => {
    console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
}

const getCode = async () => {
    try {
        const res = await getVerifyCode({
            phoneNumber: formState.username,
            isRemoteTest: false
        })
        console.log(res);
        
    } catch (error) {
        console.log('err', error);
    }
}

const login = async () => {
    try {
        const res = await loginByPhoneNumber({
            phoneNumber: formState.username, 
            veriCode: formState.verifyCode
        })
        console.log('res', res);
        
    } catch (error) {
        console.log('err', error);
        
    }
}
</script>

<style lang="scss" scoped>
@include b(login) {
    @apply h-[100%] flex justify-center items-center bg-[#e5e5e5];
}
</style>
