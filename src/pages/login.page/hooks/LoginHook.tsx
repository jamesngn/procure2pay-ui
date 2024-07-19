import { useAuthContext } from '@/contexts/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

export const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

type FormData = z.infer<typeof schema>;

export const useLoginHook = () => {
  const { login } = useAuthContext();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const handleLogin = handleSubmit(async form => {
    const { username, password } = form;

    const { error } = await login({ username, password });

    if (!error) {
      navigate('/');
    } else {
      setError('root', {
        message: error
      });
    }
  });

  return {
    register,
    handleLogin,
    errors
  };
};
