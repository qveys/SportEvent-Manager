import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import FloatingLabelInput from '../../components/ui/FloatingLabelInput';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    firstname: '',
    birthdate: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);

    try {
      await signUp(formData.email, formData.password, {
        name: formData.name,
        firstname: formData.firstname,
        birthdate: formData.birthdate,
      });
      navigate('/auth/verify-email');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Une erreur est survenue lors de la création du compte');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Créer votre compte
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Vous avez déjà un compte ?{' '}
            <Link to="/auth/signin" className="font-medium text-blue-600 hover:text-blue-500">
              Connectez-vous
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-md p-4 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <FloatingLabelInput
              id="name"
              name="name"
              type="text"
              label="Nom"
              icon={<User className="h-5 w-5" />}
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="family-name"
            />

            <FloatingLabelInput
              id="firstname"
              name="firstname"
              type="text"
              label="Prénom"
              icon={<User className="h-5 w-5" />}
              value={formData.firstname}
              onChange={handleChange}
              required
              autoComplete="given-name"
            />

            <FloatingLabelInput
              id="birthdate"
              name="birthdate"
              type="date"
              label="Date de naissance"
              icon={<Calendar className="h-5 w-5" />}
              value={formData.birthdate}
              onChange={handleChange}
              required
            />

            <FloatingLabelInput
              id="email"
              name="email"
              type="email"
              label="Adresse email"
              icon={<Mail className="h-5 w-5" />}
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />

            <div className="relative">
              <FloatingLabelInput
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                label="Mot de passe"
                icon={<Lock className="h-5 w-5" />}
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
                minLength={6}
              />
            </div>

            <div className="relative">
              <FloatingLabelInput
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                label="Confirmer le mot de passe"
                icon={<Lock className="h-5 w-5" />}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Création en cours...' : 'Créer le compte'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;