import ClientStaff from './ClientStaff';
import { StaffSectionWrapProps } from './types';

const StaffSection = async ({ locale, translations }: StaffSectionWrapProps) => {
  const StaffDataApi = (await import('@/services/StaffDataApi')).default;
  const staffData = await StaffDataApi.getMinisters(locale);

  return <ClientStaff data={staffData} translations={translations} />;
};

export default StaffSection;
