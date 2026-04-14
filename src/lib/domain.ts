export function getDomainInfo(host: string | undefined) {
  const isTherapyDomain = host?.includes('bodymindandsoultherapy') ?? false;
  return {
    isTherapyDomain,
    siteName: isTherapyDomain ? 'Body, Mind & Soul Therapy' : 'Miro Kloosterman',
    showStudio: !isTherapyDomain
  };
}
