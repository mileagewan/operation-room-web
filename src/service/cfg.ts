import { ServiceItem } from '@/types/interface-model';
import { home } from '@/service/api/home';
import { mobile } from '@/service/api/mobile';
import { nurse } from '@/service/api/nurse';

const ServiceEntries = {
  Home: home,
  Mobile: mobile,
  Nurse: nurse
};
const TargetServiceMap: Map<string, Map<string, ServiceItem>> = new Map();

const ListServiceMap: Map<string, ServiceItem> = new Map();

for (const [k, v] of Object.entries(ServiceEntries)) {
  const maps: Map<string, ServiceItem> = new Map();
  v.forEach((item: ServiceItem) => {
    maps.set(item.key, item);
    ListServiceMap.set(item.key, item);
  });
  TargetServiceMap.set(k, maps);
}
export {
  TargetServiceMap,
  ListServiceMap,
};
export default ServiceEntries;
