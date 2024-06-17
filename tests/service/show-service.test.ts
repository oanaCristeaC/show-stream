import { vi, test, expect, afterEach, describe } from 'vitest'
import { ShowService } from '../../src/api/service/show-service'
import { ShowRepository } from '../../src/api/repository/show-repository'

const showServiceInstance = new ShowService()
const mockShowInfo = {
  id: 1,
  name: 'test',
  type: 'test',
  genres: ['test'],
  image: 'test',
  rating: 1
}

describe('ShowService', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('getShowInfoPerPage', () => {
    test('it should returns null ', async () => {
      ShowRepository.prototype.fetchShows = vi.fn().mockResolvedValue(null)

      const result = await showServiceInstance.getShowInfoPerPage(0)
      expect(result).toBe(null)
    })

    test('Get Show Info Per Page returns processed object when the input is an object', async () => {
      ShowRepository.prototype.fetchShows = vi.fn().mockResolvedValue([
        {
          ...mockShowInfo,
          premiered: 'test'
        }
      ])
      const result = await showServiceInstance.getShowInfoPerPage(0)
      expect(result).toStrictEqual([mockShowInfo])
    })
  })

  describe('getRecursivelyShowsInfo', () => {
    test('it should return null when the first response value is null', async () => {
      ShowService.prototype.getShowInfoPerPage = vi.fn().mockResolvedValue(null)

      expect(await showServiceInstance.getRecursivelyShowsInfo()).toBe(null)
      expect(ShowService.prototype.getShowInfoPerPage).toHaveBeenCalledTimes(1)
    })

    test('should return concatenated value info from multiple pages', async () => {
      const mockData = [
        [{ id: 1, name: 'Show 1' }],
        [{ id: 2, name: 'Show 2' }],
        [{ id: 3, name: 'Show 3' }],
        [{ id: 4, name: 'Show 4' }],
        [{ id: 5, name: 'Show 5' }],
        null
      ]

      ShowService.prototype.getShowInfoPerPage = vi
        .fn()
        .mockResolvedValueOnce(mockData[0])
        .mockResolvedValueOnce(mockData[1])
        .mockResolvedValueOnce(mockData[2])
        .mockResolvedValueOnce(mockData[3])
        .mockResolvedValueOnce(mockData[4])
        .mockResolvedValueOnce(mockData[5])

      const result = await showServiceInstance.getRecursivelyShowsInfo()

      expect(result).toStrictEqual([
        { id: 1, name: 'Show 1' },
        { id: 2, name: 'Show 2' },
        { id: 3, name: 'Show 3' },
        { id: 4, name: 'Show 4' },
        { id: 5, name: 'Show 5' }
      ])
      expect(ShowService.prototype.getShowInfoPerPage).toHaveBeenCalledTimes(6)
    })
    test('it should stop feting after 5 pages', async () => {
      const mockData = [
        [{ id: 1, name: 'Show 1' }],
        [{ id: 2, name: 'Show 2' }],
        [{ id: 3, name: 'Show 3' }],
        [{ id: 4, name: 'Show 4' }],
        [{ id: 5, name: 'Show 5' }],
        [{ id: 6, name: 'Show 6' }]
      ]

      ShowService.prototype.getShowInfoPerPage = vi
        .fn()
        .mockResolvedValueOnce(mockData[0])
        .mockResolvedValueOnce(mockData[1])
        .mockResolvedValueOnce(mockData[2])
        .mockResolvedValueOnce(mockData[3])
        .mockResolvedValueOnce(mockData[4])
        .mockResolvedValueOnce(mockData[5])

      const result = await showServiceInstance.getRecursivelyShowsInfo()

      expect(result).toStrictEqual([
        { id: 1, name: 'Show 1' },
        { id: 2, name: 'Show 2' },
        { id: 3, name: 'Show 3' },
        { id: 4, name: 'Show 4' },
        { id: 5, name: 'Show 5' }
      ])
      expect(ShowService.prototype.getShowInfoPerPage).toHaveBeenCalledTimes(6)
    })
  })
})
