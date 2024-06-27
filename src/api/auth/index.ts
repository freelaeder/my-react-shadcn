import request from '@/lib/request'
import {AuthTypeEnum, UserRes} from "@/api/auth/types.ts";

export function login(
    data: {
        authType: AuthTypeEnum[number]
        principal: string
        credentials: string
    }
): Promise<{
    xAuthToken: string
}> {
    return request({
        url: '/tokens',
        method: 'POST',
        json: true,
        data
    })
}

export function currentProfile(): Promise<UserRes> {
    return request({
        url: '/profile',
        method: 'GET',
        json: true
    })
}

/**
 * 获取区域碳强度趋势
 */
export function queryCarbonIntensityTrend(): Promise<any> {
    return request({
        url: '/carbonIntensityTrend',
        method: 'GET',
        json: true
    })
}