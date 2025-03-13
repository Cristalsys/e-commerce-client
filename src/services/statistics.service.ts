import { instance } from '@/api/axios'

export interface IStatisticsResponse {
	id: number
	name: string
	value: number
}

export interface IMiddleStatisticsResponse {
	salesByWeek: ISalesByWeek[]
}

export interface ISalesByWeek {
	date: string
	total: number
}

class StatisticsService {
	private _STATISTICS = '/statistics'

	getMain() {
		return instance.get<IStatisticsResponse[]>(`${this._STATISTICS}/main`)
	}

	getMiddle() {
		return instance.get<IMiddleStatisticsResponse>(`${this._STATISTICS}/middle`)
	}
}

export const statisticsService = new StatisticsService()
