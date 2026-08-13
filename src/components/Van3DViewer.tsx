import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sun, Moon, Info, Snowflake, Users, Briefcase, Eye, ShieldCheck, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { VEHICLE_SPEC } from '../data/transportData';

export const Van3DViewer: React.FC = () => {
  const { t } = useLanguage();
  const mountRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [nightMode, setNightMode] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<string | null>('ac');

  const interiorImg = "/src/assets/images/mhh_van_interior_1786578405743.jpg";

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(nightMode ? 0x0a0f1d : 0x1e293b);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(7, 4, 9);
    camera.lookAt(0, 1, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, nightMode ? 0.6 : 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffd700, nightMode ? 1.5 : 2.5);
    dirLight.position.set(10, 15, 10);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const blueLight = new THREE.PointLight(0x38bdf8, 2, 20);
    blueLight.position.set(-5, 5, -5);
    scene.add(blueLight);

    // Ground Plane with Grid
    const gridHelper = new THREE.GridHelper(20, 20, 0xf59e0b, 0x334155);
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);

    // Build Hyundai i800 VIP Van Mesh Group
    const vanGroup = new THREE.Group();

    // Metallic Black Paint Material
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x111625,
      metalness: 0.85,
      roughness: 0.15,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      transparent: true,
      opacity: 0.75,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.6,
    });

    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.05,
    });

    const headlightMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xfef08a,
      emissiveIntensity: nightMode ? 2 : 0.8,
    });

    // Main Cabin Body
    const bodyGeo = new THREE.BoxGeometry(2.4, 1.7, 5.2);
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMaterial);
    bodyMesh.position.set(0, 1.2, 0);
    bodyMesh.castShadow = true;
    vanGroup.add(bodyMesh);

    // Roof Top Section
    const roofGeo = new THREE.BoxGeometry(2.3, 0.4, 4.2);
    const roofMesh = new THREE.Mesh(roofGeo, bodyMaterial);
    roofMesh.position.set(0, 2.15, -0.2);
    vanGroup.add(roofMesh);

    // Windshield & Side Windows
    const glassGeo = new THREE.BoxGeometry(2.35, 0.8, 4.8);
    const glassMesh = new THREE.Mesh(glassGeo, glassMaterial);
    glassMesh.position.set(0, 1.7, -0.1);
    vanGroup.add(glassMesh);

    // Front Grille & Bumper
    const grilleGeo = new THREE.BoxGeometry(2.2, 0.6, 0.3);
    const grilleMesh = new THREE.Mesh(grilleGeo, chromeMaterial);
    grilleMesh.position.set(0, 0.8, 2.6);
    vanGroup.add(grilleMesh);

    // Headlights
    const headlightR = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 0.2), headlightMaterial);
    headlightR.position.set(0.9, 1.1, 2.65);
    vanGroup.add(headlightR);

    const headlightL = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 0.2), headlightMaterial);
    headlightL.position.set(-0.9, 1.1, 2.65);
    vanGroup.add(headlightL);

    // Wheels
    const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
    const wheelRimMaterial = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8, roughness: 0.2 });

    const wheelPositions: [number, number, number][] = [
      [1.25, 0.45, 1.8],
      [-1.25, 0.45, 1.8],
      [1.25, 0.45, -1.8],
      [-1.25, 0.45, -1.8],
    ];

    wheelPositions.forEach(([x, y, z]) => {
      const wheelGroup = new THREE.Group();
      const wheelGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.35, 24);
      wheelGeo.rotateZ(Math.PI / 2);
      const wheel = new THREE.Mesh(wheelGeo, wheelMaterial);
      wheel.castShadow = true;
      wheelGroup.add(wheel);

      const rimGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.36, 12);
      rimGeo.rotateZ(Math.PI / 2);
      const rim = new THREE.Mesh(rimGeo, wheelRimMaterial);
      wheelGroup.add(rim);

      wheelGroup.position.set(x, y, z);
      vanGroup.add(wheelGroup);
    });

    // Gold VIP Emblem Accent Stripe
    const stripeGeo = new THREE.BoxGeometry(2.42, 0.08, 5.22);
    const stripeMaterial = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.9, roughness: 0.1 });
    const stripe = new THREE.Mesh(stripeGeo, stripeMaterial);
    stripe.position.set(0, 1.05, 0);
    vanGroup.add(stripe);

    scene.add(vanGroup);

    // Mouse Interaction for Orbit
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      vanGroup.rotation.y += deltaX * 0.008;
      camera.position.y = Math.max(1, Math.min(8, camera.position.y - deltaY * 0.01));
      camera.lookAt(0, 1, 0);

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch Support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      vanGroup.rotation.y += deltaX * 0.008;
      camera.position.y = Math.max(1, Math.min(8, camera.position.y - deltaY * 0.01));
      camera.lookAt(0, 1, 0);

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('touchstart', onTouchStart);
    container.addEventListener('touchmove', onTouchMove);
    container.addEventListener('touchend', onTouchEnd);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (autoRotate && !isDragging) {
        vanGroup.rotation.y += 0.005;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [autoRotate, nightMode]);

  return (
    <section id="van-3d" className="py-16 bg-slate-950 text-white border-b border-amber-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-extrabold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
            {t('Interactive Vehicle Inspection', 'معاينة تفاعلية 3D للمركبة')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            {t('Hyundai i800 VIP Van — 3D & Specs Explorer', 'فان هيونداي i800 VIP — المستكشف التفاعلي والمواصفات')}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            {t(
              'Drag mouse or swipe to rotate 360°. Tap hotspots to inspect climate control, 11 VIP leather seats, trunk capacity, and safety features.',
              'قم بسحب الماوس أو اللمس للتدوير 360 درجة. اضغط على النقاط التفاعلية لاستكشاف التكييف القوي، الـ 11 مقعد VIP، السعة للحقائب، والأمان.'
            )}
          </p>
        </div>

        {/* 3D Canvas Grid + Info Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* 3D WebGL Canvas Container */}
          <div className="lg:col-span-7 relative h-[420px] sm:h-[480px] bg-slate-900 rounded-2xl border border-amber-500/30 overflow-hidden shadow-2xl">
            {/* Canvas Mount */}
            <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Controls Overlay */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <div className="pointer-events-auto flex items-center gap-2">
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                    autoRotate ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
                  <span>{t('360° Auto Rotate', 'تدوير تلقائي')}</span>
                </button>

                <button
                  onClick={() => setNightMode(!nightMode)}
                  className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-amber-400 hover:bg-slate-700 pointer-events-auto"
                  title="Toggle Lighting Mode"
                >
                  {nightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </button>
              </div>

              <div className="pointer-events-auto bg-slate-950/80 backdrop-blur px-3 py-1 rounded-full border border-slate-800 text-[11px] text-amber-300 font-semibold">
                {t('Drag to rotate 360°', 'اسحب للتدوير 360 درجة')}
              </div>
            </div>

            {/* Feature Hotspots Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 pointer-events-auto">
              <button
                onClick={() => setActiveHotspot('ac')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeHotspot === 'ac' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-950/80 text-slate-200 hover:bg-slate-800 border border-slate-700'
                }`}
              >
                <Snowflake className="w-3.5 h-3.5" />
                <span>{t('Dual A/C', 'التكييف القوي')}</span>
              </button>

              <button
                onClick={() => setActiveHotspot('seats')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeHotspot === 'seats' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-950/80 text-slate-200 hover:bg-slate-800 border border-slate-700'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>{t('11 Seats', '11 مقعد VIP')}</span>
              </button>

              <button
                onClick={() => setActiveHotspot('trunk')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeHotspot === 'trunk' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-950/80 text-slate-200 hover:bg-slate-800 border border-slate-700'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>{t('6 Suitcases Trunk', 'حقائب السفر')}</span>
              </button>

              <button
                onClick={() => setActiveHotspot('doors')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeHotspot === 'doors' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-950/80 text-slate-200 hover:bg-slate-800 border border-slate-700'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{t('Sliding Doors', 'أبواب سحاب')}</span>
              </button>
            </div>
          </div>

          {/* Hotspot Detailed Information & Specs */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Active Hotspot Info Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-3">
              {activeHotspot === 'ac' && (
                <>
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                    <Snowflake className="w-5 h-5" />
                    <span>{t('Dual High-Capacity Air Conditioning', 'مكيف مركزي مزدوج عالي التبريد')}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {t(
                      'Specially engineered front and rear ceiling vents tailored for the hot climate of Jazan and coastal highways. Rapid cooling ensures total passenger comfort.',
                      'تكييف أمامي وخلفي مركزي ذو توزيع متساوي بارد جداً مخصص للتغلب على درجات الحرارة المرتفعة بجازان والمناطق الساحلية لراحة الركاب.'
                    )}
                  </p>
                </>
              )}

              {activeHotspot === 'seats' && (
                <>
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <Users className="w-5 h-5" />
                    <span>{t('11 Reclining Leather VIP Seats', '11 مقعد جلب فاخر مريح قابل للإمالة')}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {t(
                      'Spacious seating configuration arranged in 4 rows for maximum legroom, privacy, and smooth long-distance travel to Jeddah, Madinah, and Abha.',
                      'تقسيم مريح ومساحات واسعة بين المقاعد توفر الخصوصية التامة للفتيات والعائلات والطلاب في السفريات الطويلة والقصيرة.'
                    )}
                  </p>
                </>
              )}

              {activeHotspot === 'trunk' && (
                <>
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <Briefcase className="w-5 h-5" />
                    <span>{t('6 Large Suitcases Cargo Trunk', 'حقيبة خلفية تتسع لـ 6 حقائب سفر')}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {t(
                      'Tailgate rear luggage trunk accommodates 6 large suitcases plus hand carry items easily — perfect for airport arrival transfers.',
                      'مساحة تخزين خلفية واسعة تتسع لحقائب السفر الكبيرة للأسر والمسافرين من وإلى المطارات دون تضييق على الركاب.'
                    )}
                  </p>
                </>
              )}

              {activeHotspot === 'doors' && (
                <>
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <Eye className="w-5 h-5" />
                    <span>{t('Dual Sliding Doors & Easy Entry', 'أبواب سحاب مزدوجة لدخول مريح')}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {t(
                      'Dual side sliding doors provide effortless boarding and disembarking for elders, ladies, students, and children.',
                      'أبواب جانبية سحابة توفر سهولة وسرعة بالركوب والنزول لكبار السن والأطفال والعائلات بخصوصية وأمان.'
                    )}
                  </p>
                </>
              )}
            </div>

            {/* Interior Preview Image Box */}
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900 relative">
              <img
                src={interiorImg}
                alt="VIP Van Interior Seats"
                className="w-full h-36 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
                <span className="font-bold">{t('Clean VIP Interior', 'مقاعد نظيفة ومجهزة')}</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                  HYUNDAI i800
                </span>
              </div>
            </div>

            {/* Technical Specifications Table */}
            <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 text-xs space-y-2">
              <h4 className="font-bold text-amber-400 border-b border-slate-800 pb-2">
                {t('Vehicle Specifications Summary', 'ملخص المواصفات الفنية')}
              </h4>
              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <div><span className="text-slate-500">{t('Model:', 'الموديل:')}</span> {VEHICLE_SPEC.model}</div>
                <div><span className="text-slate-500">{t('Capacity:', 'السعة:')}</span> {VEHICLE_SPEC.seats} {t('Seats', 'ركاب')}</div>
                <div><span className="text-slate-500">{t('Transmission:', 'القير:')}</span> {t(VEHICLE_SPEC.transmissionEn, VEHICLE_SPEC.transmissionAr)}</div>
                <div><span className="text-slate-500">{t('Luggage:', 'الأمتعة:')}</span> {VEHICLE_SPEC.suitcases} {t('Suitcases', 'حقائب')}</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
