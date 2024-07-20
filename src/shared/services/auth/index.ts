import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

import { IDTOServiceResponse } from '@/shared/models';

import { END_POINT } from '../../../constants/end-point';
import { BaseService } from '../base-service';
import { ILoginRequest, ILoginResponse } from './dto';

class AuthService extends BaseService {
  constructor() {
    super(END_POINT.AUTH.BASE_URL);
  }

  readonly COOKIE_AUTH_TOKEN = 'authToken';

  get isAuthenticated(): boolean {
    return !!Cookies.get(this.COOKIE_AUTH_TOKEN);
  }

  get token(): string {
    return Cookies.get(this.COOKIE_AUTH_TOKEN) ?? '';
  }

  setToken = (token: string) => {
    Cookies.set(this.COOKIE_AUTH_TOKEN, token);
  };

  login = async (body: ILoginRequest): Promise<IDTOServiceResponse<ILoginResponse>> => {
    try {
      const res = await this.post<ILoginRequest, IDTOServiceResponse<ILoginResponse>>(
        END_POINT.AUTH.LOGIN,
        body,
        {
          baseURL: END_POINT.AUTH.BASE_URL
        }
      );

      if (res.successful && res.data) {
        this.setToken(res.data.access_token);

        return {
          successful: true,
          data: res.data
        };
      }

      return {
        successful: false,
        status: res.status,
        code: res.code
      };
    } catch (error) {
      return {
        successful: false,
        error: error
      };
    }
  };

  logout = async (path?: string) => {
    try {
      await this.post<null, AxiosResponse>(END_POINT.AUTH.LOGOUT, null, {
        baseURL: END_POINT.AUTH.BASE_URL,
        headers: {
          isIgnoreAuth: false
        }
      });

      this.removeAuth();
      let url = '/login';
      if (path) url += `?callbackUrl=${path}`;
      window.location.assign(url);
    } catch (error) {
      console.error(error);
    }
  };

  removeAuth = () => {
    localStorage.clear();
    Cookies.remove(this.COOKIE_AUTH_TOKEN);
  };
}

const Auth = new AuthService();
export default Auth;
