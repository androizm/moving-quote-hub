import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users, Phone } from "lucide-react";
import { useCustomerProfile } from "@/hooks/useCustomerProfile";
import { useSession } from "@supabase/auth-helpers-react";
import { useTranslation } from "react-i18next";

interface CustomerInfoStepProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    specialItems: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const CustomerInfoStep = ({ formData, onChange }: CustomerInfoStepProps) => {
  const { t } = useTranslation();
  const session = useSession();
  const { profile, isLoading } = useCustomerProfile();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const isLoggedIn = !!session;
  const fullName = profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : '';

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="name">{t('fullName')}</Label>
        <div className="relative">
          <Users className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            id="name"
            name="name"
            className="pl-10"
            placeholder={t('enterFullName')}
            value={isLoggedIn ? fullName : formData.name}
            onChange={onChange}
            required
            readOnly={isLoggedIn}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">{t('email')}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder={t('enterEmail')}
          value={isLoggedIn ? session.user.email : formData.email}
          onChange={onChange}
          required
          readOnly={isLoggedIn}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">{t('phone')}</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            id="phone"
            name="phone"
            type="tel"
            className="pl-10"
            placeholder={t('enterPhone')}
            value={isLoggedIn ? (profile?.phone || '') : formData.phone}
            onChange={onChange}
            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
            title="Please enter a valid 10-digit phone number"
            required
            readOnly={isLoggedIn}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="specialItems">{t('specialItems')}</Label>
        <Textarea
          id="specialItems"
          name="specialItems"
          placeholder={t('enterSpecialItems')}
          value={formData.specialItems}
          onChange={onChange}
        />
      </div>
    </div>
  );
};