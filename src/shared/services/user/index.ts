import { IDTOServiceResponse } from '@/shared/models';

import { END_POINT } from '../../../constants/end-point';
import { BaseService } from '../base-service';
import { IUserProfileResponse } from './dto';

class UserService extends BaseService {
  constructor() {
    super(END_POINT.USER.BASE_URL);
  }
  async getUserProfile(): Promise<IDTOServiceResponse<IUserProfileResponse>> {
    try {
      const res = await this.post<null, IDTOServiceResponse<IUserProfileResponse>>(
        END_POINT.USER.PROFILE,
        null
      );

      console.log(res);

      return {
        successful: res.successful,
        data: res.data
      };
    } catch (error) {
      return {
        successful: false,
        error: error
      };
    }
  }
}

const userService = new UserService();
export default userService;
