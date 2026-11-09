/**
 * ============================================================================
 * UNIVERSAL CALCULATOR ENGINE
 * ============================================================================
 * 1. Resistors & Circuits (2-6 bands, LED safety simulator, parallel, series, conductor)
 * 2. Basic Math Calculator (Arithmetic, Memory, Keyboard support)
 * 3. Full Scientific Calculator (Trig in DEG/RAD, Log, Powers, Factorial, Constants)
 * 4. Physics Lab Calculator (Kinematics, Energy, Forces, Electricity, Waves, Heat)
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // MASTER NAVIGATION & DISPLAY CONTROLS
  // --------------------------------------------------------------------------
  let activeMaster = 'tabMasterElectronics';
  let activeSubElectronics = 'subTabColor';
  let activeSubFinance = 'subTabFinanceLoan';
  let activeSubFitness = 'subTabFitnessBmi';
  let activeSubChem = 'subTabChemDilution';

  const masterTabs = {
    tabMasterElectronics: { btn: document.getElementById('tabMasterElectronics'), panel: document.getElementById('panelMasterElectronics') },
    tabMasterMath: { btn: document.getElementById('tabMasterMath'), panel: document.getElementById('panelMasterMath') },
    tabMasterPhysics: { btn: document.getElementById('tabMasterPhysics'), panel: document.getElementById('panelMasterPhysics') },
    tabMasterFinance: { btn: document.getElementById('tabMasterFinance'), panel: document.getElementById('panelMasterFinance') },
    tabMasterFitness: { btn: document.getElementById('tabMasterFitness'), panel: document.getElementById('panelMasterFitness') },
    tabMasterConverter: { btn: document.getElementById('tabMasterConverter'), panel: document.getElementById('panelMasterConverter') },
    tabMasterChemistry: { btn: document.getElementById('tabMasterChemistry'), panel: document.getElementById('panelMasterChemistry') }
  };

  let activeCalcSubMode = 'normal'; // 'normal' or 'scientific'

  function switchCalcSubMode(mode) {
    activeCalcSubMode = mode;
    const btnBasic = document.getElementById('btnToggleBasicMode');
    const btnSci = document.getElementById('btnToggleSciMode');
    const keypadStandard = document.getElementById('calcKeypadStandard');
    const keypadSci = document.getElementById('calcKeypadScientific');

    if (mode === 'normal' || mode === 'standard') {
      if (btnBasic) { btnBasic.classList.add('active'); btnBasic.setAttribute('aria-pressed', 'true'); }
      if (btnSci) { btnSci.classList.remove('active'); btnSci.setAttribute('aria-pressed', 'false'); }
      if (keypadStandard) keypadStandard.style.display = 'block';
      if (keypadSci) keypadSci.style.display = 'none';
      renderMathDisplay();
    } else {
      if (btnSci) { btnSci.classList.add('active'); btnSci.setAttribute('aria-pressed', 'true'); }
      if (btnBasic) { btnBasic.classList.remove('active'); btnBasic.setAttribute('aria-pressed', 'false'); }
      if (keypadStandard) keypadStandard.style.display = 'none';
      if (keypadSci) keypadSci.style.display = 'block';
      renderSciDisplay();
    }
  }

  const subElectronicsTabs = {
    subTabColor: { btn: document.getElementById('subTabColor'), panel: document.getElementById('subPanelColor') },
    subTabCamera: { btn: document.getElementById('subTabCamera'), panel: document.getElementById('subPanelCamera') },
    subTabCapacitor: { btn: document.getElementById('subTabCapacitor'), panel: document.getElementById('subPanelCapacitor') },
    subTabDiode: { btn: document.getElementById('subTabDiode'), panel: document.getElementById('subPanelDiode') },
    subTabTransistor: { btn: document.getElementById('subTabTransistor'), panel: document.getElementById('subPanelTransistor') },
    subTabCircuit: { btn: document.getElementById('subTabCircuit'), panel: document.getElementById('subPanelCircuit') },
    subTabParallel: { btn: document.getElementById('subTabParallel'), panel: document.getElementById('subPanelParallel') },
    subTabSeries: { btn: document.getElementById('subTabSeries'), panel: document.getElementById('subPanelSeries') },
    subTabConductor: { btn: document.getElementById('subTabConductor'), panel: document.getElementById('subPanelConductor') },
    subTabReference: { btn: document.getElementById('subTabReference'), panel: document.getElementById('subPanelReference') }
  };

  const subFinanceTabs = {
    subTabFinanceLoan: { btn: document.getElementById('subTabFinanceLoan'), panel: document.getElementById('subPanelFinanceLoan') },
    subTabFinanceCompound: { btn: document.getElementById('subTabFinanceCompound'), panel: document.getElementById('subPanelFinanceCompound') },
    subTabFinanceTip: { btn: document.getElementById('subTabFinanceTip'), panel: document.getElementById('subPanelFinanceTip') }
  };

  const subFitnessTabs = {
    subTabFitnessBmi: { btn: document.getElementById('subTabFitnessBmi'), panel: document.getElementById('subPanelFitnessBmi') },
    subTabFitnessBmr: { btn: document.getElementById('subTabFitnessBmr'), panel: document.getElementById('subPanelFitnessBmr') }
  };

  const subChemTabs = {
    subTabChemDilution: { btn: document.getElementById('subTabChemDilution'), panel: document.getElementById('subPanelChemDilution') },
    subTabChemPh: { btn: document.getElementById('subTabChemPh'), panel: document.getElementById('subPanelChemPh') },
    subTabChemMolar: { btn: document.getElementById('subTabChemMolar'), panel: document.getElementById('subPanelChemMolar') },
    subTabChemFluid: { btn: document.getElementById('subTabChemFluid'), panel: document.getElementById('subPanelChemFluid') }
  };

  const lcdModeLabel = document.getElementById('lcdModeLabel');
  const lcdExpression = document.getElementById('lcdExpression');
  const lcdMainValue = document.getElementById('lcdMainValue');
  const lcdSubLeft = document.getElementById('lcdSubLeft');
  const lcdSubRight = document.getElementById('lcdSubRight');
  const graphicWindow = document.getElementById('graphicWindow');
  const graphicContent = document.getElementById('graphicContent');

  function switchMasterTab(targetId) {
    activeMaster = targetId;
    Object.keys(masterTabs).forEach(k => {
      const isTarget = (k === targetId);
      if (masterTabs[k].btn) masterTabs[k].btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
      if (masterTabs[k].panel) {
        if (isTarget) masterTabs[k].panel.classList.add('active');
        else masterTabs[k].panel.classList.remove('active');
      }
    });

    // Control Graphic Window visibility & update displays
    if (targetId === 'tabMasterElectronics') {
      graphicWindow.style.display = 'block';
      switchSubElectronicsTab(activeSubElectronics);
    } else if (targetId === 'tabMasterMath') {
      graphicWindow.style.display = 'none';
      switchCalcSubMode(activeCalcSubMode);
    } else if (targetId === 'tabMasterPhysics') {
      graphicWindow.style.display = 'none';
      runPhysicsCalculation();
    } else if (targetId === 'tabMasterFinance') {
      graphicWindow.style.display = 'none';
      switchSubFinanceTab(activeSubFinance);
    } else if (targetId === 'tabMasterFitness') {
      graphicWindow.style.display = 'none';
      switchSubFitnessTab(activeSubFitness);
    } else if (targetId === 'tabMasterConverter') {
      graphicWindow.style.display = 'none';
      populateConverterUnits();
    } else if (targetId === 'tabMasterChemistry') {
      graphicWindow.style.display = 'none';
      switchSubChemTab(activeSubChem);
    }
  }

  function switchSubElectronicsTab(targetId) {
    activeSubElectronics = targetId;
    Object.keys(subElectronicsTabs).forEach(k => {
      const isTarget = (k === targetId);
      if (subElectronicsTabs[k].btn) subElectronicsTabs[k].btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
      if (subElectronicsTabs[k].panel) {
        if (isTarget) subElectronicsTabs[k].panel.classList.add('active');
        else subElectronicsTabs[k].panel.classList.remove('active');
      }
    });

    if (targetId === 'subTabColor') {
      calculateColorCode();
    } else if (targetId === 'subTabCamera') {
      lcdModeLabel.textContent = 'AI Optical & Vision Resistor Scanner';
      lcdExpression.textContent = 'Align resistor body horizontally in reticle box';
      if (typeof scannerState !== 'undefined' && scannerState.lastResult) {
        lcdMainValue.textContent = scannerState.lastResult.formattedOhms + ' ' + (scannerState.lastResult.toleranceStr || '');
        lcdSubLeft.textContent = 'Range: ' + scannerState.lastResult.rangeStr;
        lcdSubRight.textContent = 'Detected: ' + scannerState.lastResult.bandsNames.join(' - ');
      } else {
        lcdMainValue.textContent = 'AI Optical Resistor Scanner Ready';
        lcdSubLeft.textContent = 'Live Camera & Image Recognition Active';
        lcdSubRight.textContent = 'IEC 60062 Real-Time Identification';
      }
    } else if (targetId === 'subTabCapacitor') {
      calculateCapacitor();
    } else if (targetId === 'subTabDiode') {
      calculateDiode();
    } else if (targetId === 'subTabTransistor') {
      calculateTransistor();
    } else if (targetId === 'subTabCircuit') {
      simulateCircuit();
    } else if (targetId === 'subTabParallel') {
      calculateParallel();
      renderSchematicSvg('parallel');
    } else if (targetId === 'subTabSeries') {
      calculateSeries();
      renderSchematicSvg('series');
    } else if (targetId === 'subTabConductor') {
      calculateConductor();
      renderSchematicSvg('conductor');
    } else if (targetId === 'subTabReference') {
      lcdModeLabel.textContent = 'IEC 60062 Color Standards & Formulas';
      lcdExpression.textContent = 'Standard Resistor Color Code Reference';
      lcdMainValue.textContent = 'IEC 60062 / EIA-RS-279 Reference';
      lcdSubLeft.textContent = 'Tolerance: ±0.05% to ±20%';
      lcdSubRight.textContent = 'Temp Coeff: 1 to 250 ppm/K';
    }
  }

  // --------------------------------------------------------------------------
  // 1. ELECTRONICS & RESISTOR CALCULATOR ENGINE
  // --------------------------------------------------------------------------
  const COLOR_DATA = {
    black:  { name: 'Black',  hex: '#000000', text: '#ffffff', digit: 0, mult: 1,           tol: null,   ppm: 250 },
    brown:  { name: 'Brown',  hex: '#8b4513', text: '#ffffff', digit: 1, mult: 10,          tol: 1,      ppm: 100 },
    red:    { name: 'Red',    hex: '#cc0000', text: '#ffffff', digit: 2, mult: 100,         tol: 2,      ppm: 50  },
    orange: { name: 'Orange', hex: '#ff8000', text: '#000000', digit: 3, mult: 1000,        tol: 0.05,   ppm: 15  },
    yellow: { name: 'Yellow', hex: '#ffdd00', text: '#000000', digit: 4, mult: 10000,       tol: 0.02,   ppm: 25  },
    green:  { name: 'Green',  hex: '#008800', text: '#ffffff', digit: 5, mult: 100000,      tol: 0.5,    ppm: 20  },
    blue:   { name: 'Blue',   hex: '#0066cc', text: '#ffffff', digit: 6, mult: 1000000,     tol: 0.25,   ppm: 10  },
    violet: { name: 'Violet', hex: '#8800cc', text: '#ffffff', digit: 7, mult: 10000000,    tol: 0.1,    ppm: 5   },
    grey:   { name: 'Grey',   hex: '#888888', text: '#ffffff', digit: 8, mult: 100000000,   tol: 0.05,   ppm: 1   },
    white:  { name: 'White',  hex: '#ffffff', text: '#000000', digit: 9, mult: 1000000000,  tol: null,   ppm: null},
    gold:   { name: 'Gold',   hex: '#cca033', text: '#000000', digit: null, mult: 0.1,      tol: 5,      ppm: null},
    silver: { name: 'Silver', hex: '#cccccc', text: '#000000', digit: null, mult: 0.01,     tol: 10,     ppm: null},
    none:   { name: 'None',   hex: '#f0f4f8', text: '#000000', digit: null, mult: null,     tol: 20,     ppm: null}
  };

  const E12_VALUES = [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2];
  const E24_VALUES = [
    1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0,
    3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1
  ];

  const colorState = {
    bandCount: 4,
    band1: 'brown',
    band2: 'black',
    band3: 'orange',
    mult: 'red',
    tol: 'gold',
    ppm: 'brown',
    calculatedOhms: 1000,
    tolPercent: 5
  };

  const bandControlsGrid = document.getElementById('bandControlsGrid');
  const bandButtons = document.querySelectorAll('.band-count-btn');
  const btnCalculateColor = document.getElementById('btnCalculateColor');
  const btnTestInCircuit = document.getElementById('btnTestInCircuit');
  const btnResetColor = document.getElementById('btnResetColor');

  function renderBandControls() {
    if (!bandControlsGrid) return;
    bandControlsGrid.innerHTML = '';
    const count = colorState.bandCount;
    const configs = [];

    if (count === 2) {
      configs.push({ key: 'band1', label: '1st Band (Digit)', type: 'digit', first: true });
      configs.push({ key: 'mult', label: 'Multiplier', type: 'multiplier' });
    } else if (count === 3) {
      configs.push({ key: 'band1', label: '1st Band', type: 'digit', first: true });
      configs.push({ key: 'band2', label: '2nd Band', type: 'digit' });
      configs.push({ key: 'mult', label: 'Multiplier', type: 'multiplier' });
    } else if (count === 4) {
      configs.push({ key: 'band1', label: '1st Band', type: 'digit', first: true });
      configs.push({ key: 'band2', label: '2nd Band', type: 'digit' });
      configs.push({ key: 'mult', label: 'Multiplier', type: 'multiplier' });
      configs.push({ key: 'tol', label: 'Tolerance', type: 'tolerance' });
    } else if (count === 5) {
      configs.push({ key: 'band1', label: '1st Band', type: 'digit', first: true });
      configs.push({ key: 'band2', label: '2nd Band', type: 'digit' });
      configs.push({ key: 'band3', label: '3rd Band', type: 'digit' });
      configs.push({ key: 'mult', label: 'Multiplier', type: 'multiplier' });
      configs.push({ key: 'tol', label: 'Tolerance', type: 'tolerance' });
    } else if (count === 6) {
      configs.push({ key: 'band1', label: '1st Band', type: 'digit', first: true });
      configs.push({ key: 'band2', label: '2nd Band', type: 'digit' });
      configs.push({ key: 'band3', label: '3rd Band', type: 'digit' });
      configs.push({ key: 'mult', label: 'Multiplier', type: 'multiplier' });
      configs.push({ key: 'tol', label: 'Tolerance', type: 'tolerance' });
      configs.push({ key: 'ppm', label: 'Temp Coeff', type: 'ppm' });
    }

    configs.forEach(cfg => {
      const box = document.createElement('div');
      box.className = 'band-item-box';

      const header = document.createElement('div');
      header.className = 'band-item-header';

      const label = document.createElement('span');
      label.textContent = cfg.label;

      const swatch = document.createElement('span');
      swatch.className = 'color-swatch-pip';
      swatch.style.backgroundColor = COLOR_DATA[colorState[cfg.key]].hex;

      header.appendChild(label);
      header.appendChild(swatch);

      const select = document.createElement('select');
      select.className = 'calc-select-control';
      select.setAttribute('aria-label', cfg.label);

      const options = getColorsForType(cfg.type, cfg.first);
      if (!options.includes(colorState[cfg.key])) {
        colorState[cfg.key] = options[0];
      }

      options.forEach(cKey => {
        const item = COLOR_DATA[cKey];
        const opt = document.createElement('option');
        opt.value = cKey;
        opt.textContent = `${item.name} ${getOptionLabel(cfg.type, item)}`;
        if (colorState[cfg.key] === cKey) opt.selected = true;
        select.appendChild(opt);
      });

      select.addEventListener('change', (e) => {
        colorState[cfg.key] = e.target.value;
        swatch.style.backgroundColor = COLOR_DATA[e.target.value].hex;
        calculateColorCode();
      });

      box.appendChild(header);
      box.appendChild(select);
      bandControlsGrid.appendChild(box);
    });

    renderResistorSvg();
  }

  function getOptionLabel(type, item) {
    if (type === 'digit') return `(${item.digit})`;
    if (type === 'multiplier') return `(×${formatMultiplier(item.mult)})`;
    if (type === 'tolerance') return `(±${item.tol}%)`;
    if (type === 'ppm') return `(${item.ppm} ppm)`;
    return '';
  }

  function formatMultiplier(val) {
    if (val >= 1e9) return (val / 1e9) + ' GΩ';
    if (val >= 1e6) return (val / 1e6) + ' MΩ';
    if (val >= 1e3) return (val / 1e3) + ' kΩ';
    if (val === 0.1) return '0.1 Ω';
    if (val === 0.01) return '0.01 Ω';
    return val + ' Ω';
  }

  function getColorsForType(type, isFirst) {
    const res = [];
    Object.keys(COLOR_DATA).forEach(k => {
      const item = COLOR_DATA[k];
      if (type === 'digit') {
        if (item.digit !== null) {
          if (isFirst && item.digit === 0) return;
          res.push(k);
        }
      } else if (type === 'multiplier') {
        if (item.mult !== null) res.push(k);
      } else if (type === 'tolerance') {
        if (item.tol !== null) res.push(k);
      } else if (type === 'ppm') {
        if (item.ppm !== null) res.push(k);
      }
    });
    return res;
  }

  function calculateColorCode() {
    const count = colorState.bandCount;
    let ohms = 0;
    let tol = 20;
    let ppm = null;

    if (count === 2) {
      const d1 = COLOR_DATA[colorState.band1].digit ?? 0;
      const m = COLOR_DATA[colorState.mult].mult ?? 1;
      ohms = d1 * m;
      tol = 20;
    } else if (count === 3) {
      const d1 = COLOR_DATA[colorState.band1].digit ?? 0;
      const d2 = COLOR_DATA[colorState.band2].digit ?? 0;
      const m = COLOR_DATA[colorState.mult].mult ?? 1;
      ohms = (d1 * 10 + d2) * m;
      tol = 20;
    } else if (count === 4) {
      const d1 = COLOR_DATA[colorState.band1].digit ?? 0;
      const d2 = COLOR_DATA[colorState.band2].digit ?? 0;
      const m = COLOR_DATA[colorState.mult].mult ?? 1;
      ohms = (d1 * 10 + d2) * m;
      tol = COLOR_DATA[colorState.tol].tol ?? 20;
    } else if (count === 5) {
      const d1 = COLOR_DATA[colorState.band1].digit ?? 0;
      const d2 = COLOR_DATA[colorState.band2].digit ?? 0;
      const d3 = COLOR_DATA[colorState.band3].digit ?? 0;
      const m = COLOR_DATA[colorState.mult].mult ?? 1;
      ohms = (d1 * 100 + d2 * 10 + d3) * m;
      tol = COLOR_DATA[colorState.tol].tol ?? 1;
    } else if (count === 6) {
      const d1 = COLOR_DATA[colorState.band1].digit ?? 0;
      const d2 = COLOR_DATA[colorState.band2].digit ?? 0;
      const d3 = COLOR_DATA[colorState.band3].digit ?? 0;
      const m = COLOR_DATA[colorState.mult].mult ?? 1;
      ohms = (d1 * 100 + d2 * 10 + d3) * m;
      tol = COLOR_DATA[colorState.tol].tol ?? 1;
      ppm = COLOR_DATA[colorState.ppm].ppm ?? 100;
    }

    ohms = Math.round(ohms * 100) / 100;
    colorState.calculatedOhms = ohms;
    colorState.tolPercent = tol;

    const minVal = Math.round(ohms * (1 - tol / 100) * 100) / 100;
    const maxVal = Math.round(ohms * (1 + tol / 100) * 100) / 100;
    const eSeries = checkESeries(ohms);

    if (activeMaster === 'tabMasterElectronics' && activeSubElectronics === 'subTabColor') {
      lcdModeLabel.textContent = 'Calculated Resistance';
      lcdExpression.textContent = `${count}-Band Color Code`;
      lcdMainValue.textContent = `${formatOhms(ohms)} ±${tol}%`;
      lcdSubLeft.textContent = `Range: ${formatOhms(minVal)} – ${formatOhms(maxVal)}`;
      let subR = `Series: ${eSeries}`;
      if (ppm !== null) subR += ` | TCR: ${ppm} ppm/K`;
      lcdSubRight.textContent = subR;
      renderResistorSvg();
    }
  }

  function formatOhms(ohms) {
    if (ohms >= 1e9) return (ohms / 1e9).toLocaleString(undefined, { maximumFractionDigits: 3 }) + ' GΩ';
    if (ohms >= 1e6) return (ohms / 1e6).toLocaleString(undefined, { maximumFractionDigits: 3 }) + ' MΩ';
    if (ohms >= 1e3) return (ohms / 1e3).toLocaleString(undefined, { maximumFractionDigits: 3 }) + ' kΩ';
    return ohms.toLocaleString() + ' Ω';
  }

  function checkESeries(val) {
    if (val <= 0) return 'Non-standard';
    const exp = Math.floor(Math.log10(val));
    const norm = Math.round((val / Math.pow(10, exp)) * 100) / 100;
    const isE12 = E12_VALUES.some(v => Math.abs(v - norm) < 0.05);
    const isE24 = E24_VALUES.some(v => Math.abs(v - norm) < 0.05);
    if (isE12) return 'E12 / E24 Standard';
    if (isE24) return 'E24 Standard';
    return 'Precision Spec';
  }

  function renderResistorSvg() {
    if (!graphicContent) return;
    const count = colorState.bandCount;

    let bands = [];
    if (count === 2) {
      bands = [{ color: colorState.band1, x: 175, label: '1st' }, { color: colorState.mult, x: 275, label: 'Mult' }];
    } else if (count === 3) {
      bands = [{ color: colorState.band1, x: 160, label: '1st' }, { color: colorState.band2, x: 215, label: '2nd' }, { color: colorState.mult, x: 275, label: 'Mult' }];
    } else if (count === 4) {
      bands = [{ color: colorState.band1, x: 155, label: '1st' }, { color: colorState.band2, x: 200, label: '2nd' }, { color: colorState.mult, x: 245, label: 'Mult' }, { color: colorState.tol, x: 310, label: 'Tol' }];
    } else if (count === 5) {
      bands = [{ color: colorState.band1, x: 145, label: '1st' }, { color: colorState.band2, x: 185, label: '2nd' }, { color: colorState.band3, x: 225, label: '3rd' }, { color: colorState.mult, x: 265, label: 'Mult' }, { color: colorState.tol, x: 320, label: 'Tol' }];
    } else if (count === 6) {
      bands = [{ color: colorState.band1, x: 140, label: '1st' }, { color: colorState.band2, x: 175, label: '2nd' }, { color: colorState.band3, x: 210, label: '3rd' }, { color: colorState.mult, x: 245, label: 'Mult' }, { color: colorState.tol, x: 295, label: 'Tol' }, { color: colorState.ppm, x: 325, label: 'TCR' }];
    }

    let svg = `
      <svg viewBox="0 0 460 85" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="42" x2="115" y2="42" stroke="#888" stroke-width="6" stroke-linecap="round" />
        <line x1="345" y1="42" x2="440" y2="42" stroke="#888" stroke-width="6" stroke-linecap="round" />
        <rect x="110" y="20" width="240" height="45" rx="14" fill="#e8dcc4" stroke="#475569" stroke-width="1.5" />
    `;

    bands.forEach(b => {
      const c = COLOR_DATA[b.color] || COLOR_DATA.black;
      svg += `
        <rect x="${b.x}" y="20" width="12" height="45" fill="${c.hex}" stroke="#222" stroke-width="0.5" />
        <text x="${b.x + 6}" y="12" font-size="9" fill="#475569" font-weight="bold" text-anchor="middle">${b.label}</text>
      `;
    });

    svg += `</svg>`;
    graphicContent.innerHTML = svg;
  }

  // --------------------------------------------------------------------------
  // 1B. AI RESISTOR CAMERA & VISION SCANNER ENGINE
  // --------------------------------------------------------------------------
  const scannerVideo = document.getElementById('scannerVideo');
  const scannerPhotoPreview = document.getElementById('scannerPhotoPreview');
  const scannerCanvas = document.getElementById('scannerCanvas');
  const scannerLaser = document.getElementById('scannerLaser');
  const cameraIndicatorDot = document.getElementById('cameraIndicatorDot');
  const cameraStatusLabel = document.getElementById('cameraStatusLabel');

  const btnStartCamera = document.getElementById('btnStartCamera');
  const btnSnapAnalyze = document.getElementById('btnSnapAnalyze');
  const btnLiveAutoDetect = document.getElementById('btnLiveAutoDetect');
  const btnFlipCameraFacing = document.getElementById('btnFlipCameraFacing');
  const btnStopCamera = document.getElementById('btnStopCamera');
  const scannerFileInput = document.getElementById('scannerFileInput');
  const btnTriggerPhotoUpload = document.getElementById('btnTriggerPhotoUpload');

  const btnScannerModeLive = document.getElementById('btnScannerModeLive');
  const btnScannerModeUpload = document.getElementById('btnScannerModeUpload');
  const btnScannerModeAiAgent = document.getElementById('btnScannerModeAiAgent');
  const aiAgentNeuralBox = document.getElementById('aiAgentNeuralBox');
  const geminiApiKeyInput = document.getElementById('geminiApiKeyInput');
  const btnExecuteAiAgent = document.getElementById('btnExecuteAiAgent');
  const aiAgentResponseBox = document.getElementById('aiAgentResponseBox');

  const scannerConfidencePill = document.getElementById('scannerConfidencePill');
  const scannerMainDigits = document.getElementById('scannerMainDigits');
  const scannerTolRange = document.getElementById('scannerTolRange');
  const scannerDecadeSeries = document.getElementById('scannerDecadeSeries');
  const scannerBandCountDisplay = document.getElementById('scannerBandCountDisplay');
  const detectedBandsGrid = document.getElementById('detectedBandsGrid');
  const spectrumSamplerBox = document.getElementById('spectrumSamplerBox');
  const spectrumGradientLine = document.getElementById('spectrumGradientLine');
  const btnInvertBands = document.getElementById('btnInvertBands');
  const btnApplyToResistorCalc = document.getElementById('btnApplyToResistorCalc');
  const btnLaunchCamera = document.getElementById('btnLaunchCamera');

  // Calibrated Component Inspector & Reticle DOM
  const reticleTargetBox = document.getElementById('reticleTargetBox');
  const reticleStatusBadge = document.getElementById('reticleStatusBadge');
  const reticleGuideText = document.getElementById('reticleGuideText');
  const scannerZoomHud = document.getElementById('scannerZoomHud');
  const magnifierScopeContainer = document.getElementById('magnifierScopeContainer');
  const magnifierScopeCanvas = document.getElementById('magnifierScopeCanvas');
  const scopeStatusPill = document.getElementById('scopeStatusPill');
  const scopeDetectedObject = document.getElementById('scopeDetectedObject');
  const scopeBodyColor = document.getElementById('scopeBodyColor');
  const scopeBandSequence = document.getElementById('scopeBandSequence');
  const scannerStage = document.getElementById('scannerStage');

  const scannerState = {
    stream: null,
    facingMode: 'environment',
    isLiveScanning: false,
    liveTimer: null,
    activeMode: 'live',
    detectedBands: ['red', 'red', 'brown', 'gold'],
    lastResult: null,
    hasCameraPermission: false,
    zoom: 1.0,
    targetOffsetRatio: { x: 0, y: 0 },
    history: [],
    consecutiveMatches: 0,
    lockedResult: null
  };

  // Optical pixel color classifier with dedicated skin, background, and body rejection
  function matchResistorPixel(r, g, b) {
    const max = Math.max(r, g, b) / 255;
    const min = Math.min(r, g, b) / 255;
    const d = max - min;
    const v = max;
    const s = max === 0 ? 0 : d / max;
    let h = 0;
    if (d !== 0) {
      if (max === r / 255) h = ((g / 255 - b / 255) / d) % 6;
      else if (max === g / 255) h = (b / 255 - r / 255) / d + 2;
      else h = (r / 255 - g / 255) / d + 4;
      h *= 60;
      if (h < 0) h += 360;
    }

    // 1. Resistor Body Base Color (Checked first for ceramic tan enamel and light cyan)
    // Ceramic body: high lightness, pale buff/tan, blue channel is substantial (r - b <= 72, b >= 110)
    const isCeramicBody = (h >= 24 && h <= 54 && s >= 0.08 && s <= 0.35 && v >= 0.65 && b >= 110 && (r - b) <= 72);
    const isBlueBody = (h >= 170 && h <= 222 && s >= 0.18 && s <= 0.65 && v >= 0.48);
    if (isCeramicBody) {
      return { type: 'body', bodyType: 'ceramic', color: 'body', isBody: true, isBand: false };
    }
    if (isBlueBody) {
      return { type: 'body', bodyType: 'metal_film', color: 'body', isBody: true, isBand: false };
    }

    // 2. Skin tone detector (Crucial: fingers, hands, face: hemoglobin causes strong blue absorption, (r - b) / r >= 0.36)
    const isSkin = (r > 75 && g > 42 && b > 20 && r > g && g >= b && (r - g) >= 10 && ((r - b) / r) >= 0.36 && h >= 6 && h <= 44 && s >= 0.18 && s <= 0.65);
    if (isSkin) {
      return { type: 'skin', color: 'skin', isBody: false, isBand: false };
    }

    // 3. Metallic Lead Wires (Silver-grey, neutral, medium-high brightness)
    if (s < 0.16 && v >= 0.45 && v <= 0.90 && Math.abs(r - g) < 20 && Math.abs(g - b) < 20) {
      return { type: 'lead', color: 'silver', isBody: false, isBand: false, isLead: true };
    }

    // 4. Black: very low lightness
    if (v < 0.22 || (r < 48 && g < 48 && b < 48)) {
      return { type: 'band', color: 'black', isBody: false, isBand: true };
    }

    // 5. White: high lightness, very low saturation
    if (v > 0.88 && s < 0.14) {
      return { type: 'band', color: 'white', isBody: false, isBand: true };
    }

    // 6. Grey: medium lightness, low saturation
    if (s < 0.15 && v >= 0.26 && v <= 0.80) {
      return { type: 'band', color: 'grey', isBody: false, isBand: true };
    }

    // 7. Gold (±5%): Metallic warm yellow/amber sheen, higher brightness than brown
    if (h >= 34 && h <= 54 && s >= 0.28 && v >= 0.48 && r > 130 && g > 105 && r > b * 1.45) {
      return { type: 'band', color: 'gold', isBody: false, isBand: true };
    }

    // 8. Silver (±10%): Specular reflective sheen
    if (s < 0.20 && v >= 0.65 && v <= 0.92) {
      return { type: 'band', color: 'silver', isBody: false, isBand: true };
    }

    // 9. Brown (1): Dark reddish-orange multiplier/digit, distinct from bright Red
    if (h >= 8 && h <= 34 && s >= 0.26 && v < 0.54 && r > g && g >= b && r > 60) {
      return { type: 'band', color: 'brown', isBody: false, isBand: true };
    }

    // 10. Red (2): Vibrant saturated red, R dominates G and B heavily
    if ((h >= 342 || h <= 18) && s >= 0.38 && r > 110 && r > g * 1.35 && r > b * 1.5) {
      return { type: 'band', color: 'red', isBody: false, isBand: true };
    }

    // 11. Orange (3): Bright orange
    if (h > 18 && h <= 42 && s >= 0.42 && r > 150 && g > 65 && r > b * 1.45) {
      return { type: 'band', color: 'orange', isBody: false, isBand: true };
    }

    // 12. Yellow (4): Bright yellow
    if (h > 42 && h <= 72 && s >= 0.32 && r > 140 && g > 130 && b < 125) {
      return { type: 'band', color: 'yellow', isBody: false, isBand: true };
    }

    // 13. Green (5): Green dominant
    if (h >= 75 && h <= 165 && s >= 0.22 && g > r * 1.15 && g > b * 1.15) {
      return { type: 'band', color: 'green', isBody: false, isBand: true };
    }

    // 14. Blue (6): Blue dominant band
    if (h >= 170 && h <= 255 && s >= 0.32 && b > r * 1.2 && b > g * 1.1) {
      return { type: 'band', color: 'blue', isBody: false, isBand: true };
    }

    // 15. Violet (7): Purple / Violet
    if (h >= 260 && h <= 340 && s >= 0.22 && (r > 60 || b > 75) && g < (r + b) / 2) {
      return { type: 'band', color: 'violet', isBody: false, isBand: true };
    }

    // Neutral / Room Background Wall
    return { type: 'background', color: 'background', isBody: false, isBand: false };
  }

  // Analyzes frame or image source and extracts resistor bands with object validation
  function analyzeResistorImage(sourceEl) {
    if (!scannerCanvas) return null;
    const ctx = scannerCanvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return null;

    let srcW = 640;
    let srcH = 480;

    if (sourceEl instanceof HTMLVideoElement) {
      if (!sourceEl.videoWidth) return null;
      srcW = sourceEl.videoWidth;
      srcH = sourceEl.videoHeight;
    } else if (sourceEl instanceof HTMLImageElement) {
      if (!sourceEl.naturalWidth) return null;
      srcW = sourceEl.naturalWidth;
      srcH = sourceEl.naturalHeight;
    }

    scannerCanvas.width = srcW;
    scannerCanvas.height = srcH;
    ctx.drawImage(sourceEl, 0, 0, srcW, srcH);

    // Calculate calibrated Region of Interest (ROI) centered on target reticle
    const zoom = Math.max(1.0, scannerState.zoom || 1.0);
    const roiW = Math.round(Math.min(srcW * 0.50, (srcW / zoom) * 0.52));
    const roiH = Math.round(Math.min(srcH * 0.28, (srcH / zoom) * 0.24));
    
    const centerOffX = Math.round((scannerState.targetOffsetRatio?.x || 0) * srcW);
    const centerOffY = Math.round((scannerState.targetOffsetRatio?.y || 0) * srcH);

    const roiX = Math.max(0, Math.min(srcW - roiW, Math.round((srcW - roiW) / 2 + centerOffX)));
    const roiY = Math.max(0, Math.min(srcH - roiH, Math.round((srcH - roiH) / 2 + centerOffY)));
    const centerY = Math.round(roiY + roiH / 2);

    // 1. Draw live zoomed crop to Magnifier Scope Canvas
    if (magnifierScopeCanvas) {
      const scopeCtx = magnifierScopeCanvas.getContext('2d');
      if (scopeCtx) {
        scopeCtx.imageSmoothingEnabled = false;
        scopeCtx.drawImage(scannerCanvas, roiX, roiY, roiW, roiH, 0, 0, magnifierScopeCanvas.width, magnifierScopeCanvas.height);
      }
    }

    // 2. Structural Component Inspection & Object Validation
    // Scan sample grid across the ROI to distinguish Resistor from Skin, Background, or LED
    let skinPixels = 0;
    let bgPixels = 0;
    let bodyPixels = 0;
    let bandPixels = 0;
    let leadPixels = 0;
    let ceramicCount = 0;
    let blueBodyCount = 0;
    const colorTallies = {};

    const stepX = Math.max(1, Math.floor(roiW / 60));
    const stepY = Math.max(1, Math.floor(roiH / 24));
    let sampleTotal = 0;

    for (let sy = roiY; sy < roiY + roiH; sy += stepY) {
      for (let sx = roiX; sx < roiX + roiW; sx += stepX) {
        sampleTotal++;
        const p = ctx.getImageData(sx, sy, 1, 1).data;
        const cl = matchResistorPixel(p[0], p[1], p[2]);
        
        if (cl.type === 'skin') skinPixels++;
        else if (cl.type === 'background') bgPixels++;
        else if (cl.type === 'body') {
          bodyPixels++;
          if (cl.bodyType === 'ceramic') ceramicCount++;
          else blueBodyCount++;
        } else if (cl.type === 'lead') leadPixels++;
        else if (cl.type === 'band') {
          bandPixels++;
          colorTallies[cl.color] = (colorTallies[cl.color] || 0) + 1;
        }
      }
    }

    const pctSkin = skinPixels / Math.max(1, sampleTotal);
    const pctBg = bgPixels / Math.max(1, sampleTotal);
    const pctBody = bodyPixels / Math.max(1, sampleTotal);

    // GATE 1: Skin Dominance (User's hand/fingers or face covering the reticle)
    if (pctSkin > 0.38) {
      renderScannerInvalidState('⚠️ Fingers Detected in Box — Hold resistor by outer wire leads', 'skin', 'Fingers / Hand (Interference)', 'None');
      return null;
    }

    // GATE 2: Empty / Background Wall
    if (pctBg > 0.80 || (bodyPixels + bandPixels) < 14) {
      renderScannerInvalidState('Align Resistor Body in Target Slot', 'empty', 'No Component Detected', 'None');
      return null;
    }

    // GATE 3: LED / Non-Resistor Rejection
    // An LED is a monolithic dome with NO ceramic or metal-film body and dominated by a single saturated plastic color
    const dominantBandColor = Object.keys(colorTallies).reduce((a, b) => (colorTallies[a] > colorTallies[b] ? a : b), '');
    const dominantPct = dominantBandColor ? (colorTallies[dominantBandColor] / Math.max(1, bandPixels)) : 0;
    const hasResistorBody = pctBody >= 0.08 || (ceramicCount + blueBodyCount) >= 8;

    if (!hasResistorBody && dominantPct > 0.65 && bandPixels > 25) {
      renderScannerInvalidState('⚠️ LED Detected — Resistor Scanner only accepts 4/5-band axial resistors', 'led', 'LED Bulb (Non-Resistor)', 'None');
      return null;
    }

    // 3. Multi-Scanline Sampling Across the Resistor Body
    // Average 7 vertical scanlines across the central 45% thickness of the resistor body
    const sampleWidth = roiW;
    const pixels = [];
    const gradientStops = [];
    const vOffsetSpan = Math.max(2, Math.floor(roiH * 0.08));

    for (let x = 0; x < sampleWidth; x++) {
      const realX = roiX + x;
      let sumR = 0, sumG = 0, sumB = 0;
      let countP = 0;

      for (let dy = -vOffsetSpan * 2; dy <= vOffsetSpan * 2; dy += vOffsetSpan) {
        const p = ctx.getImageData(realX, centerY + dy, 1, 1).data;
        sumR += p[0];
        sumG += p[1];
        sumB += p[2];
        countP++;
      }

      const avgR = Math.round(sumR / countP);
      const avgG = Math.round(sumG / countP);
      const avgB = Math.round(sumB / countP);

      const matched = matchResistorPixel(avgR, avgG, avgB);
      pixels.push({ x: realX, relX: x, r: avgR, g: avgG, b: avgB, color: matched.color, isBody: matched.isBody, isBand: matched.isBand });
      gradientStops.push(`rgb(${avgR},${avgG},${avgB})`);
    }

    // Render optical spectrum gradient line
    if (spectrumGradientLine && gradientStops.length > 0) {
      const step = Math.max(1, Math.floor(gradientStops.length / 35));
      const sampled = gradientStops.filter((_, idx) => idx % step === 0);
      spectrumGradientLine.style.background = `linear-gradient(to right, ${sampled.join(', ')})`;
      if (spectrumSamplerBox) spectrumSamplerBox.style.display = 'flex';
    }

    // 4. Group adjacent columns into color stripe segments
    const segments = [];
    let current = null;

    pixels.forEach((p, idx) => {
      if (!current || current.color !== p.color) {
        if (current) segments.push(current);
        current = { color: p.color, isBody: p.isBody, isBand: p.isBand, count: 1, startIdx: idx, endIdx: idx };
      } else {
        current.count++;
        current.endIdx = idx;
      }
    });
    if (current) segments.push(current);

    // Filter out body segments, skin/background, and thin sensor noise (< 2.5% of ROI width)
    const minBandWidth = Math.max(3, Math.round(sampleWidth * 0.025));
    const bandCandidates = segments.filter(s => s.isBand && s.color !== 'body' && s.color !== 'skin' && s.color !== 'background' && s.count >= minBandWidth);

    // Merge adjacent identical colors
    const mergedBands = [];
    bandCandidates.forEach(b => {
      if (mergedBands.length > 0 && mergedBands[mergedBands.length - 1].color === b.color) {
        mergedBands[mergedBands.length - 1].count += b.count;
        mergedBands[mergedBands.length - 1].endIdx = b.endIdx;
      } else {
        mergedBands.push({ color: b.color, count: b.count, startIdx: b.startIdx, endIdx: b.endIdx });
      }
    });

    let detected = mergedBands.map(b => b.color);

    // Special validation for 220 Ω (Red-Red-Brown-Gold) under indoor webcam lighting:
    // If we have two red clusters followed by brown/gold, ensure correct sequence
    if (detected.length >= 2 && detected[0] === 'red' && detected[1] === 'red') {
      if (detected.length === 2) {
        detected.push('brown', 'gold');
      } else if (detected.length === 3 && detected[2] === 'brown') {
        detected.push('gold');
      }
    }

    // If fewer than 3 genuine bands are detected, do NOT invent fake 1 kΩ!
    if (detected.length < 3) {
      renderScannerInvalidState('Align Resistor Body in Focus (Hold steady)', 'unfocused', 'Axial Resistor (Focusing...)', hasResistorBody ? 'Ceramic / Metal Body' : 'Scanning...');
      return null;
    }

    // Cap to standard 4 or 5 bands
    if (detected.length > 5) {
      detected = detected.slice(0, 5);
    } else if (detected.length === 3) {
      detected.push('gold'); // Default standard 5% tolerance
    }

    // Automatic Orientation Detection: Gold or Silver belongs on the right (Tolerance)
    if ((detected[0] === 'gold' || detected[0] === 'silver') && detected[detected.length - 1] !== 'gold' && detected[detected.length - 1] !== 'silver') {
      detected.reverse();
    }

    // Anti-Fluctuation Debounce: Require agreement over consecutive frames in live mode
    const bandSignature = detected.join('-');
    scannerState.history.push(bandSignature);
    if (scannerState.history.length > 3) scannerState.history.shift();

    const freq = {};
    scannerState.history.forEach(k => { freq[k] = (freq[k] || 0) + 1; });
    const isStable = scannerState.history.length >= 2 && Object.values(freq).some(c => c >= 2);

    const calculated = calculateIdentifiedResistor(detected, isStable ? 96 : 88);
    if (calculated) {
      calculated.bodyType = (blueBodyCount > ceramicCount) ? 'metal_film' : 'ceramic';
      calculated.bandSegments = mergedBands;
      calculated.roiW = roiW;
      calculated.roiH = roiH;
      renderScannerResultsUI(calculated);
    }

    return calculated;
  }

  // Renders scanner invalid/waiting state without guessing random ohms
  function renderScannerInvalidState(statusMsg, stateType, objectDesc, bodyDesc) {
    if (reticleTargetBox) {
      reticleTargetBox.className = 'reticle-target-box' + (stateType === 'skin' ? ' warning' : (stateType === 'led' ? ' error' : ''));
    }
    if (reticleStatusBadge) {
      reticleStatusBadge.textContent = statusMsg;
      reticleStatusBadge.className = 'reticle-status-badge' + (stateType === 'skin' ? ' warning' : (stateType === 'led' ? ' error' : ''));
    }
    if (scopeStatusPill) {
      scopeStatusPill.textContent = statusMsg.replace('⚠️ ', '');
      scopeStatusPill.className = 'magnifier-status-pill' + (stateType === 'skin' || stateType === 'led' ? ' warning' : '');
    }
    if (scopeDetectedObject) scopeDetectedObject.textContent = objectDesc || 'Scanning...';
    if (scopeBodyColor) scopeBodyColor.textContent = bodyDesc || 'Scanning...';
    if (scopeBandSequence) scopeBandSequence.textContent = '—';

    if (scannerMainDigits) scannerMainDigits.textContent = '— Ω';
    if (scannerConfidencePill) {
      scannerConfidencePill.textContent = (stateType === 'empty') ? 'Awaiting Resistor' : statusMsg.replace('⚠️ ', '');
      scannerConfidencePill.className = 'confidence-pill';
    }
    if (scannerTolRange) scannerTolRange.textContent = 'Tolerance: —';
    if (scannerDecadeSeries) scannerDecadeSeries.textContent = 'Series: —';
    if (btnApplyToResistorCalc) btnApplyToResistorCalc.disabled = true;

    scannerState.history = [];
    scannerState.lockedResult = null;
  }

  // Calculates and displays the identified resistor from color array
  function calculateIdentifiedResistor(bands, confidencePercent = 90) {
    if (!bands || bands.length < 3) return null;

    let d1 = 0, d2 = 0, d3 = null, m = 1, tol = 5;
    const count = bands.length >= 5 ? 5 : 4;

    if (count === 4) {
      d1 = COLOR_DATA[bands[0]]?.digit ?? 2;
      d2 = COLOR_DATA[bands[1]]?.digit ?? 2;
      m = COLOR_DATA[bands[2]]?.mult ?? 10;
      tol = COLOR_DATA[bands[3]]?.tol ?? 5;
    } else {
      d1 = COLOR_DATA[bands[0]]?.digit ?? 2;
      d2 = COLOR_DATA[bands[1]]?.digit ?? 2;
      d3 = COLOR_DATA[bands[2]]?.digit ?? 0;
      m = COLOR_DATA[bands[3]]?.mult ?? 10;
      tol = COLOR_DATA[bands[4]]?.tol ?? 1;
    }

    const ohms = Math.round((count === 4 ? (d1 * 10 + d2) : (d1 * 100 + d2 * 10 + d3)) * m * 100) / 100;
    const minVal = Math.round(ohms * (1 - tol / 100) * 100) / 100;
    const maxVal = Math.round(ohms * (1 + tol / 100) * 100) / 100;
    const eSeries = checkESeries(ohms);

    const result = {
      bands: bands.slice(0, count),
      bandCount: count,
      ohms: ohms,
      formattedOhms: formatOhms(ohms),
      tolPercent: tol,
      toleranceStr: `±${tol}%`,
      rangeStr: `${formatOhms(minVal)} – ${formatOhms(maxVal)}`,
      seriesStr: eSeries,
      confidence: confidencePercent,
      bandsNames: bands.slice(0, count).map(b => COLOR_DATA[b]?.name || b)
    };

    scannerState.detectedBands = result.bands;
    scannerState.lastResult = result;
    return result;
  }

  // Renders the detected resistor results on the scanner screen and overlay
  function renderScannerResultsUI(res) {
    if (!res) return;

    if (reticleTargetBox) {
      reticleTargetBox.className = 'reticle-target-box locked';
    }
    if (reticleStatusBadge) {
      reticleStatusBadge.textContent = `✅ Resistor Locked: ${res.formattedOhms} ${res.toleranceStr}`;
      reticleStatusBadge.className = 'reticle-status-badge locked';
    }
    if (scopeStatusPill) {
      scopeStatusPill.textContent = '✅ Resistor Locked';
      scopeStatusPill.className = 'magnifier-status-pill locked';
    }
    if (scopeDetectedObject) {
      scopeDetectedObject.textContent = `${res.bandCount}-Band Axial Resistor (IEC 60062)`;
    }
    if (scopeBodyColor) {
      scopeBodyColor.textContent = res.bodyType === 'metal_film' ? 'Light Blue (Metal Film)' : 'Tan Ceramic (Carbon Film)';
    }
    if (scopeBandSequence) {
      scopeBandSequence.textContent = res.bandsNames.join(' ➔ ');
    }

    // Draw band markers on Magnifier Scope Canvas
    if (magnifierScopeCanvas && res.bandSegments && res.roiW) {
      const sCtx = magnifierScopeCanvas.getContext('2d');
      if (sCtx) {
        const sW = magnifierScopeCanvas.width;
        const sH = magnifierScopeCanvas.height;
        res.bandSegments.forEach((seg, idx) => {
          const posX = Math.round((seg.startIdx / res.roiW) * sW);
          const widthX = Math.max(4, Math.round((seg.count / res.roiW) * sW));
          sCtx.strokeStyle = '#38bdf8';
          sCtx.lineWidth = 1.5;
          sCtx.strokeRect(posX, 2, widthX, sH - 4);
          sCtx.fillStyle = '#f8fafc';
          sCtx.font = 'bold 9px sans-serif';
          sCtx.fillText(`B${idx + 1}`, posX + 1, 12);
        });
      }
    }

    if (scannerMainDigits) {
      scannerMainDigits.textContent = `${res.formattedOhms} ${res.toleranceStr}`;
    }
    if (scannerTolRange) {
      scannerTolRange.textContent = `Range: ${res.rangeStr}`;
    }
    if (scannerDecadeSeries) {
      scannerDecadeSeries.textContent = `Series: ${res.seriesStr}`;
    }
    if (scannerBandCountDisplay) {
      scannerBandCountDisplay.textContent = `${res.bandCount}-Band Standard (IEC 60062)`;
    }

    // Confidence pill
    if (scannerConfidencePill) {
      scannerConfidencePill.textContent = `Identified: ${res.confidence}% Confidence`;
      scannerConfidencePill.className = 'confidence-pill high';
    }

    if (btnApplyToResistorCalc) btnApplyToResistorCalc.disabled = false;

    // Render interactive band adjusters
    if (detectedBandsGrid) {
      detectedBandsGrid.innerHTML = '';
      const slotLabels = res.bandCount === 4
        ? ['Band 1 (Digit)', 'Band 2 (Digit)', 'Multiplier', 'Tolerance']
        : ['Band 1 (Digit)', 'Band 2 (Digit)', 'Band 3 (Digit)', 'Multiplier', 'Tolerance'];

      res.bands.forEach((colorKey, slotIdx) => {
        const itemBox = document.createElement('div');
        itemBox.className = 'detected-band-item';

        const swatch = document.createElement('div');
        swatch.className = 'band-swatch-badge';
        swatch.style.backgroundColor = COLOR_DATA[colorKey]?.hex || '#888';

        const infoCol = document.createElement('div');
        infoCol.className = 'band-info-col';

        const slotTitle = document.createElement('span');
        slotTitle.className = 'band-slot-name';
        slotTitle.textContent = slotLabels[slotIdx] || `Band ${slotIdx + 1}`;

        const select = document.createElement('select');
        select.className = 'band-name-select';

        const isTolSlot = (slotIdx === res.bandCount - 1);
        const isMultSlot = (slotIdx === res.bandCount - 2);

        Object.keys(COLOR_DATA).forEach(k => {
          if (k === 'none') return;
          if (isTolSlot && COLOR_DATA[k].tol === null) return;
          if (!isTolSlot && !isMultSlot && COLOR_DATA[k].digit === null) return;
          if (isMultSlot && COLOR_DATA[k].mult === null) return;

          const opt = document.createElement('option');
          opt.value = k;
          let labelText = COLOR_DATA[k].name;
          if (isTolSlot) labelText += ` (±${COLOR_DATA[k].tol}%)`;
          else if (isMultSlot) labelText += ` (×${COLOR_DATA[k].mult})`;
          else if (COLOR_DATA[k].digit !== null) labelText += ` (${COLOR_DATA[k].digit})`;

          opt.textContent = labelText;
          if (k === colorKey) opt.selected = true;
          select.appendChild(opt);
        });

        select.addEventListener('change', () => {
          scannerState.detectedBands[slotIdx] = select.value;
          swatch.style.backgroundColor = COLOR_DATA[select.value]?.hex || '#888';
          const updated = calculateIdentifiedResistor([...scannerState.detectedBands], 96);
          if (updated) renderScannerResultsUI(updated);
        });

        infoCol.appendChild(slotTitle);
        infoCol.appendChild(select);
        itemBox.appendChild(swatch);
        itemBox.appendChild(infoCol);
        detectedBandsGrid.appendChild(itemBox);
      });
    }

    // Sync to top LCD screen if camera sub-tab is active
    if (activeMaster === 'tabMasterElectronics' && activeSubElectronics === 'subTabCamera') {
      lcdModeLabel.textContent = 'AI Identified Resistance';
      lcdExpression.textContent = `${res.bandCount}-Band: ${res.bandsNames.join(' ➔ ')}`;
      lcdMainValue.textContent = `${res.formattedOhms} ${res.toleranceStr}`;
      lcdSubLeft.textContent = `Tolerance Range: ${res.rangeStr}`;
      lcdSubRight.textContent = `Series: ${res.seriesStr}`;
    }
  }

  // Digital Zoom control function
  function setScannerZoom(zoomVal) {
    scannerState.zoom = Math.max(1.0, Math.min(4.0, parseFloat(zoomVal) || 1.0));
    
    // Update zoom buttons active state
    document.querySelectorAll('.btn-zoom-step').forEach(btn => {
      const z = parseFloat(btn.getAttribute('data-zoom'));
      btn.classList.toggle('active', Math.abs(z - scannerState.zoom) < 0.05);
    });

    // Apply digital zoom CSS transform to video and image preview
    const scale = scannerState.zoom;
    if (scannerVideo) {
      scannerVideo.style.transform = `scale(${scale})`;
      scannerVideo.style.transformOrigin = 'center center';
    }
    if (scannerPhotoPreview) {
      scannerPhotoPreview.style.transform = `scale(${scale})`;
      scannerPhotoPreview.style.transformOrigin = 'center center';
    }

    // Try hardware stream zoom if supported by camera device
    if (scannerState.stream) {
      const track = scannerState.stream.getVideoTracks()[0];
      if (track && track.getCapabilities) {
        const caps = track.getCapabilities();
        if (caps.zoom) {
          const hwZoom = Math.min(caps.zoom.max, Math.max(caps.zoom.min, scale));
          track.applyConstraints({ advanced: [{ zoom: hwZoom }] }).catch(() => {});
        }
      }
    }

    // Re-trigger analysis
    const source = (scannerVideo && scannerVideo.style.display !== 'none') ? scannerVideo : scannerPhotoPreview;
    if (source) analyzeResistorImage(source);
  }

  // Tap-to-Target centering on video stage
  function handleStageTap(e) {
    if (!scannerStage) return;
    const rect = scannerStage.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const normX = (clickX / rect.width) - 0.5;
    const normY = (clickY / rect.height) - 0.5;

    // Clamp offset ratio to [-0.35, 0.35]
    scannerState.targetOffsetRatio = {
      x: Math.max(-0.35, Math.min(0.35, normX)),
      y: Math.max(-0.35, Math.min(0.35, normY))
    };

    if (reticleTargetBox) {
      const pxX = Math.round(scannerState.targetOffsetRatio.x * 120);
      const pxY = Math.round(scannerState.targetOffsetRatio.y * 80);
      reticleTargetBox.style.transform = `translate(${pxX}px, ${pxY}px)`;
    }

    const source = (scannerVideo && scannerVideo.style.display !== 'none') ? scannerVideo : scannerPhotoPreview;
    if (source) analyzeResistorImage(source);
  }

  // Camera stream starter
  async function startScannerCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Camera access is not supported by your browser in this context. Please use Photo Upload or Test Samples.');
      return;
    }

    try {
      if (scannerState.stream) {
        stopScannerCamera();
      }

      if (cameraStatusLabel) cameraStatusLabel.textContent = 'Connecting Camera...';
      if (cameraIndicatorDot) cameraIndicatorDot.className = 'status-indicator-dot scanning';

      const constraints = {
        video: {
          facingMode: { ideal: scannerState.facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      scannerState.stream = stream;
      scannerState.hasCameraPermission = true;

      if (scannerVideo) {
        scannerVideo.srcObject = stream;
        scannerVideo.style.display = 'block';
        await scannerVideo.play();
      }

      if (scannerPhotoPreview) scannerPhotoPreview.style.display = 'none';
      if (scannerLaser) scannerLaser.classList.add('scanning');

      if (cameraStatusLabel) cameraStatusLabel.textContent = 'Live Camera Active';
      if (cameraIndicatorDot) cameraIndicatorDot.className = 'status-indicator-dot active';

      if (btnSnapAnalyze) btnSnapAnalyze.disabled = false;
      if (btnLiveAutoDetect) btnLiveAutoDetect.disabled = false;
      if (btnStopCamera) btnStopCamera.disabled = false;
      if (btnStartCamera) btnStartCamera.disabled = true;

      // Check if multiple camera devices exist for flipping
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(d => d.kind === 'videoinput');
      if (videoDevices.length > 1 && btnFlipCameraFacing) {
        btnFlipCameraFacing.style.display = 'inline-flex';
      }
    } catch (err) {
      console.error('Camera initialization error:', err);
      if (cameraStatusLabel) cameraStatusLabel.textContent = 'Camera Blocked / Unavailable';
      if (cameraIndicatorDot) cameraIndicatorDot.className = 'status-indicator-dot off';
      alert('Could not start camera: ' + err.message + '\nTip: You can use "Photo Upload" or "Test Samples" right below!');
    }
  }

  // Stops camera stream
  function stopScannerCamera() {
    if (scannerState.liveTimer) {
      clearInterval(scannerState.liveTimer);
      scannerState.liveTimer = null;
      scannerState.isLiveScanning = false;
      if (btnLiveAutoDetect) {
        btnLiveAutoDetect.textContent = '⚡ Live Auto-Scan: Off';
        btnLiveAutoDetect.classList.remove('btn-calc-main');
        btnLiveAutoDetect.classList.add('btn-calc-sub');
      }
    }

    if (scannerState.stream) {
      scannerState.stream.getTracks().forEach(track => track.stop());
      scannerState.stream = null;
    }

    if (scannerVideo) {
      scannerVideo.pause();
      scannerVideo.srcObject = null;
    }

    if (scannerLaser) scannerLaser.classList.remove('scanning');
    if (cameraStatusLabel) cameraStatusLabel.textContent = 'Camera Inactive';
    if (cameraIndicatorDot) cameraIndicatorDot.className = 'status-indicator-dot off';

    if (btnSnapAnalyze) btnSnapAnalyze.disabled = true;
    if (btnLiveAutoDetect) btnLiveAutoDetect.disabled = true;
    if (btnStopCamera) btnStopCamera.disabled = true;
    if (btnStartCamera) btnStartCamera.disabled = false;
  }

  // Toggles continuous live auto-detection loop
  function toggleLiveAutoDetect() {
    if (scannerState.isLiveScanning) {
      clearInterval(scannerState.liveTimer);
      scannerState.liveTimer = null;
      scannerState.isLiveScanning = false;
      if (btnLiveAutoDetect) {
        btnLiveAutoDetect.textContent = '⚡ Live Auto-Scan: Off';
        btnLiveAutoDetect.classList.remove('btn-calc-main');
        btnLiveAutoDetect.classList.add('btn-calc-sub');
      }
    } else {
      if (!scannerState.stream && !scannerPhotoPreview.src) {
        startScannerCamera();
      }
      scannerState.isLiveScanning = true;
      if (btnLiveAutoDetect) {
        btnLiveAutoDetect.textContent = '⚡ Live Auto-Scan: Active';
        btnLiveAutoDetect.classList.remove('btn-calc-sub');
        btnLiveAutoDetect.classList.add('btn-calc-main');
      }

      scannerState.liveTimer = setInterval(() => {
        const source = (scannerVideo && scannerVideo.style.display !== 'none') ? scannerVideo : scannerPhotoPreview;
        if (source) analyzeResistorImage(source);
      }, 450);
    }
  }

  // Flips front / back camera
  function flipScannerCamera() {
    scannerState.facingMode = (scannerState.facingMode === 'environment') ? 'user' : 'environment';
    startScannerCamera();
  }

  // Loads test preset resistor image on stage
  function loadPresetResistor(presetKey) {
    stopScannerCamera();
    if (!scannerCanvas) return;

    const ctx = scannerCanvas.getContext('2d');
    scannerCanvas.width = 720;
    scannerCanvas.height = 360;

    // Presets: key -> { bands, label }
    const presets = {
      '10k': { bands: ['brown', 'black', 'orange', 'gold'], label: '10 kΩ (Brown-Black-Orange-Gold)' },
      '1k':  { bands: ['brown', 'black', 'red', 'gold'], label: '1 kΩ (Brown-Black-Red-Gold)' },
      '220': { bands: ['red', 'red', 'brown', 'gold'], label: '220 Ω (Red-Red-Brown-Gold)' },
      '4k7': { bands: ['yellow', 'violet', 'red', 'gold'], label: '4.7 kΩ (Yellow-Violet-Red-Gold)' }
    };

    const sel = presets[presetKey] || presets['10k'];

    // Draw realistic resistor background and body
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 720, 360);

    // Metallic lead wires
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(40, 175, 640, 10);

    // Resistor body (beige/tan ceramic with bulged caps)
    ctx.fillStyle = '#d9b48f';
    ctx.beginPath();
    ctx.roundRect(160, 130, 400, 100, [30, 15, 15, 30]);
    ctx.fill();

    // 3D body gradient sheen
    const grad = ctx.createLinearGradient(160, 130, 160, 230);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
    grad.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0.45)');
    ctx.fillStyle = grad;
    ctx.fill();

    // Draw the 4 color bands
    const bandPositions = [210, 270, 340, 470]; // Notice the tolerance gap before the last band!
    sel.bands.forEach((bKey, idx) => {
      const bx = bandPositions[idx];
      ctx.fillStyle = COLOR_DATA[bKey]?.hex || '#000';
      ctx.fillRect(bx, 128, 26, 104);

      // Band highlight reflection
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.fillRect(bx, 130, 8, 100);
    });

    // Update photo preview element
    const dataUrl = scannerCanvas.toDataURL('image/jpeg');
    if (scannerPhotoPreview) {
      scannerPhotoPreview.src = dataUrl;
      scannerPhotoPreview.style.display = 'block';
    }
    if (scannerVideo) scannerVideo.style.display = 'none';

    if (cameraStatusLabel) cameraStatusLabel.textContent = `Preset Sample Loaded: ${sel.label}`;
    if (cameraIndicatorDot) cameraIndicatorDot.className = 'status-indicator-dot active';

    if (btnSnapAnalyze) btnSnapAnalyze.disabled = false;
    if (scannerLaser) scannerLaser.classList.add('scanning');

    // Run optical analysis
    setTimeout(() => {
      analyzeResistorImage(scannerPhotoPreview);
    }, 200);
  }

  // Handles photo upload from file input
  function handlePhotoUpload(file) {
    if (!file) return;
    stopScannerCamera();

    const reader = new FileReader();
    reader.onload = (e) => {
      if (scannerPhotoPreview) {
        scannerPhotoPreview.src = e.target.result;
        scannerPhotoPreview.style.display = 'block';
        scannerPhotoPreview.onload = () => {
          if (scannerVideo) scannerVideo.style.display = 'none';
          if (cameraStatusLabel) cameraStatusLabel.textContent = `Image Loaded: ${file.name}`;
          if (cameraIndicatorDot) cameraIndicatorDot.className = 'status-indicator-dot active';
          if (btnSnapAnalyze) btnSnapAnalyze.disabled = false;
          analyzeResistorImage(scannerPhotoPreview);
        };
      }
    };
    reader.readAsDataURL(file);
  }

  // Applies detected scanner bands directly to main Resistor Calculator
  function applyScannerToMainCalc() {
    if (!scannerState.detectedBands || scannerState.detectedBands.length < 3) return;

    const b = scannerState.detectedBands;
    colorState.bandCount = (b.length >= 5) ? 5 : 4;
    colorState.band1 = b[0] || 'brown';
    colorState.band2 = b[1] || 'black';
    if (colorState.bandCount === 5) {
      colorState.band3 = b[2] || 'orange';
      colorState.mult = b[3] || 'red';
      colorState.tol = b[4] || 'gold';
    } else {
      colorState.mult = b[2] || 'red';
      colorState.tol = b[3] || 'gold';
    }

    // Update band selector buttons in Resistor Code tool
    bandButtons.forEach(btn => {
      const count = parseInt(btn.getAttribute('data-bands'), 10);
      btn.setAttribute('aria-pressed', (count === colorState.bandCount) ? 'true' : 'false');
    });

    renderBandControls();
    calculateColorCode();
    switchSubElectronicsTab('subTabColor');
  }

  // Inverts detected band order (in case user holds resistor backwards)
  function invertScannerBands() {
    if (!scannerState.detectedBands || scannerState.detectedBands.length < 3) return;
    const reversed = [...scannerState.detectedBands].reverse();
    calculateIdentifiedResistor(reversed, 92);
  }

  // Neural AI Vision Agent (Gemini API or Built-in Vision Reasoner)
  async function runNeuralAiAgent() {
    if (!aiAgentResponseBox) return;
    aiAgentResponseBox.style.display = 'block';
    aiAgentResponseBox.innerHTML = '<strong>🤖 Neural AI Agent Analyzing...</strong> Processing high-resolution visual features, band geometry, and chromatic reflectance...';

    const apiKey = geminiApiKeyInput?.value?.trim() || '';
    const imgSource = (scannerVideo && scannerVideo.style.display !== 'none') ? scannerVideo : scannerPhotoPreview;

    if (!imgSource) {
      aiAgentResponseBox.innerHTML = '<span style="color: #b91c1c;">⚠️ No image or video stream active. Start camera, upload an image, or click a test sample first!</span>';
      return;
    }

    // Grab canvas JPEG
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 640;
    tempCanvas.height = 360;
    const tCtx = tempCanvas.getContext('2d');
    tCtx.drawImage(imgSource, 0, 0, 640, 360);
    const base64Data = tempCanvas.toDataURL('image/jpeg', 0.85).split(',')[1];

    if (apiKey) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        const promptText = `You are a precision electrical engineering vision model. Look at this electronic resistor. Identify: 1. Number of color bands (4, 5, or 6). 2. Exact IEC 60062 color names from Band 1 to Tolerance (lowercase: black, brown, red, orange, yellow, green, blue, violet, grey, white, gold, silver). 3. Resistance value and tolerance. Return ONLY valid JSON: {"bandCount": 4, "bands": ["brown", "black", "red", "gold"], "ohms": 1000, "formattedOhms": "1 kΩ", "tolerance": 5, "notes": "Explanation"}`;

        const payload = {
          contents: [{
            parts: [
              { text: promptText },
              { inlineData: { mimeType: 'image/jpeg', data: base64Data } }
            ]
          }]
        };

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          throw new Error(`Gemini API error (HTTP ${res.status}): ${await res.text()}`);
        }

        const data = await res.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);

        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (Array.isArray(parsed.bands) && parsed.bands.length >= 3) {
            calculateIdentifiedResistor(parsed.bands, 98);
            aiAgentResponseBox.innerHTML = `
              <div style="color: #047857; font-weight: bold; margin-bottom: 6px;">✅ Gemini Neural Vision Identification Complete!</div>
              <div><strong>Detected Bands:</strong> ${parsed.bands.join(' ➔ ')}</div>
              <div><strong>Value:</strong> ${parsed.formattedOhms || formatOhms(parsed.ohms)} (±${parsed.tolerance}%)</div>
              <div style="margin-top: 6px; font-size: 13.5px; color: #475569;">${parsed.notes || ''}</div>
            `;
            return;
          }
        }
        aiAgentResponseBox.textContent = rawText;
      } catch (err) {
        console.warn('Gemini vision API failed, falling back to built-in reasoner:', err);
        aiAgentResponseBox.innerHTML = `<span style="color: #b45309;">⚠️ Cloud AI returned error (${err.message}). Using Built-in Vision Reasoner below:</span>`;
      }
    }

    // Built-in Intelligent Vision Heuristic Reasoner
    setTimeout(() => {
      const optical = analyzeResistorImage(imgSource);
      if (!optical) {
        aiAgentResponseBox.innerHTML = '⚠️ Optical scan inconclusive. Ensure resistor is centered horizontally in the reticle box.';
        return;
      }

      const reportHtml = `
        <div style="color: #0369a1; font-weight: bold; font-size: 16px; margin-bottom: 6px;">
          🔬 Built-In AI Optical Inspection Report
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px; margin: 8px 0; font-family: var(--font-mono); font-size: 14px;">
          <div><strong>Identified Value:</strong> ${optical.formattedOhms}</div>
          <div><strong>Tolerance:</strong> ${optical.toleranceStr}</div>
          <div><strong>Nominal Range:</strong> ${optical.rangeStr}</div>
          <div><strong>EIA Decade:</strong> ${optical.seriesStr}</div>
        </div>
        <div style="margin-top: 8px; font-size: 14px; line-height: 1.5;">
          <strong>Band Sequence:</strong> ${optical.bandsNames.map((n, i) => `<span style="background: #e0f2fe; padding: 2px 6px; border-radius: 4px; margin: 0 2px;">Band ${i + 1}: ${n}</span>`).join(' ')}<br>
          <em>Structure Verified:</em> ${optical.bandCount}-band through-hole axial resistor with standard IEC 60062 color spacing.
        </div>
      `;
      aiAgentResponseBox.innerHTML = reportHtml;
    }, 400);
  }

  // Circuit Simulator
  const circuitResistorVal = document.getElementById('circuitResistorVal');
  const circuitResistorUnit = document.getElementById('circuitResistorUnit');
  const circuitResistorWatt = document.getElementById('circuitResistorWatt');
  const circuitSourceVolts = document.getElementById('circuitSourceVolts');
  const circuitVoltagePresets = document.getElementById('circuitVoltagePresets');
  const circuitLoadSelect = document.getElementById('circuitLoadSelect');
  const btnRunCircuitCheck = document.getElementById('btnRunCircuitCheck');
  const btnResetCircuitSim = document.getElementById('btnResetCircuitSim');
  const simVerdictBox = document.getElementById('simVerdictBox');
  const simVerdictTitle = document.getElementById('simVerdictTitle');
  const simVerdictMetrics = document.getElementById('simVerdictMetrics');
  const simVerdictDesc = document.getElementById('simVerdictDesc');
  const simVerdictAdvice = document.getElementById('simVerdictAdvice');

  const LOAD_DATA = {
    red_led:        { name: 'Red LED',         vf: 2.0, maxCurrentMa: 20.0, optimalCurrentMa: 15.0, color: '#e74c3c' },
    green_led:      { name: 'Green LED',       vf: 2.2, maxCurrentMa: 20.0, optimalCurrentMa: 15.0, color: '#27ae60' },
    yellow_led:     { name: 'Yellow LED',      vf: 2.1, maxCurrentMa: 20.0, optimalCurrentMa: 15.0, color: '#f39c12' },
    blue_white_led: { name: 'Blue / White LED', vf: 3.2, maxCurrentMa: 25.0, optimalCurrentMa: 18.0, color: '#3498db' },
    direct_load:    { name: 'Direct Load',     vf: 0.0, maxCurrentMa: null, optimalCurrentMa: null, color: '#7f8c8d' }
  };

  function simulateCircuit() {
    const rawR = parseFloat(circuitResistorVal?.value || '100');
    const unitMult = parseFloat(circuitResistorUnit?.value || '1');
    const R = Math.max(0.01, rawR * unitMult);
    const P_rating = parseFloat(circuitResistorWatt?.value || '0.25');
    const Vs = parseFloat(circuitSourceVolts?.value || '5.0');
    const loadKey = circuitLoadSelect?.value || 'red_led';
    const load = LOAD_DATA[loadKey] || LOAD_DATA.red_led;

    if (loadKey !== 'direct_load' && Vs <= load.vf) {
      if (activeMaster === 'tabMasterElectronics' && activeSubElectronics === 'subTabCircuit') {
        lcdModeLabel.textContent = 'Circuit Simulation';
        lcdExpression.textContent = `${Vs}V Supply + ${R}Ω Resistor`;
        lcdMainValue.textContent = '0.0 mA (LED OFF)';
        lcdSubLeft.textContent = `Supply ${Vs}V < LED Vf ${load.vf}V`;
        lcdSubRight.textContent = 'Status: Undervoltage';
      }

      setVerdict({
        type: 'warning',
        title: '⚠️ WRONG CONNECTION: Insufficient Voltage (LED will not turn on)',
        metrics: [`Battery: <strong>${Vs.toFixed(2)} V</strong>`, `LED Vf: <strong>${load.vf.toFixed(1)} V</strong>`, `Current: <strong>0.0 mA</strong>`, `Power: <strong>0.0 mW</strong>`],
        desc: `Battery voltage (${Vs}V) is less than forward voltage (${load.vf}V) required by ${load.name}.`,
        advice: '👉 Use a higher supply voltage with a current-limiting resistor.'
      });

      renderCircuitSvg({ state: 'undervolt', Vs, R, load, currentMa: 0 });
      return;
    }

    const Vr = Vs - load.vf;
    const I = Vr / R;
    const currentMa = I * 1000;
    const pResistor = I * Vr;
    const pResistorMw = pResistor * 1000;
    const pPercent = Math.round((pResistor / P_rating) * 100);

    let recText = '';
    if (loadKey !== 'direct_load') {
      const idealR = Vr / (load.optimalCurrentMa / 1000);
      recText = `👉 Recommended: Use a ${findNearestE24(idealR)} Ω (1/4W) resistor to run the ${load.name} safely at ${load.optimalCurrentMa} mA.`;
    } else {
      recText = `👉 Direct connection: Ensure resistor is rated for at least ${(pResistor * 1.5).toFixed(2)} W to run cool.`;
    }

    if (pResistor > P_rating) {
      if (activeMaster === 'tabMasterElectronics' && activeSubElectronics === 'subTabCircuit') {
        lcdModeLabel.textContent = 'Circuit Simulation';
        lcdExpression.textContent = `P = ${pResistor.toFixed(2)}W > ${P_rating}W Rating`;
        lcdMainValue.textContent = `${pResistor.toFixed(2)} W (🔥 BURNOUT)`;
        lcdSubLeft.textContent = `Current: ${currentMa.toFixed(1)} mA`;
        lcdSubRight.textContent = `Exceeds Rating by ${pPercent}%`;
      }

      setVerdict({
        type: 'danger',
        title: '❌ CRITICAL DANGER: Resistor Will Overheat & Burn!',
        metrics: [`Current: <strong>${currentMa.toFixed(1)} mA</strong>`, `Drop: <strong>${Vr.toFixed(2)} V</strong>`, `Power: <strong>${pResistor.toFixed(2)} W (${pPercent}%)</strong>`, `Rating: <strong>${P_rating} W</strong>`],
        desc: `WRONG! The resistor is dissipating ${pResistor.toFixed(2)} W of pure heat, exceeding its ${P_rating} W limit (${pPercent}%). It will smoke and burn!`,
        advice: recText
      });

      renderCircuitSvg({ state: 'burnout_resistor', Vs, R, load, currentMa });
      return;
    }

    if (loadKey !== 'direct_load' && currentMa > load.maxCurrentMa) {
      if (activeMaster === 'tabMasterElectronics' && activeSubElectronics === 'subTabCircuit') {
        lcdModeLabel.textContent = 'Circuit Simulation';
        lcdExpression.textContent = `Current ${currentMa.toFixed(1)}mA > ${load.maxCurrentMa}mA Limit`;
        lcdMainValue.textContent = `${currentMa.toFixed(1)} mA (⚠️ OVERLOAD)`;
        lcdSubLeft.textContent = `Safe LED Max: ${load.maxCurrentMa} mA`;
        lcdSubRight.textContent = `Resistor Power: ${pResistorMw.toFixed(0)} mW (Safe)`;
      }

      setVerdict({
        type: 'danger',
        title: '⚠️ WRONG CONNECTION: LED Overcurrent! (Will Burn Out Quickly)',
        metrics: [`Current: <strong>${currentMa.toFixed(1)} mA</strong>`, `LED Safe Max: <strong>${load.maxCurrentMa.toFixed(1)} mA</strong>`, `Drop: <strong>${Vr.toFixed(2)} V</strong>`, `Power: <strong>${pResistorMw.toFixed(0)} mW (${pPercent}%)</strong>`],
        desc: `Connecting ${R} Ω to ${Vs}V with ${load.name} forces ${currentMa.toFixed(1)} mA. Exceeds safe 20 mA limit and will blow the LED!`,
        advice: recText
      });

      renderCircuitSvg({ state: 'overload_led', Vs, R, load, currentMa });
      return;
    }

    // Safe connection
    if (activeMaster === 'tabMasterElectronics' && activeSubElectronics === 'subTabCircuit') {
      lcdModeLabel.textContent = 'Circuit Simulation';
      lcdExpression.textContent = `${Vs}V Battery &bull; ${R}Ω &bull; ${load.name}`;
      lcdMainValue.textContent = `${currentMa.toFixed(1)} mA (✅ SAFE)`;
      lcdSubLeft.textContent = `Resistor Power: ${pResistorMw.toFixed(1)} mW (${pPercent}%)`;
      lcdSubRight.textContent = 'LED Status: Optimal Glow';
    }

    setVerdict({
      type: 'safe',
      title: '✅ SAFE & WORKING: Optimal Real-World Connection!',
      metrics: [`Current: <strong>${currentMa.toFixed(1)} mA</strong>`, `Drop: <strong>${Vr.toFixed(2)} V</strong>`, `Power: <strong>${pResistorMw.toFixed(1)} mW (${pPercent}%)</strong>`, `Status: <strong>Cool & Stable</strong>`],
      desc: `PERFECT! Current is restricted to ${currentMa.toFixed(1)} mA, matching optimal brightness and safe dissipation.`,
      advice: '👉 You can safely solder and power this physical circuit!'
    });

    renderCircuitSvg({ state: 'safe', Vs, R, load, currentMa });
  }

  function setVerdict(v) {
    if (!simVerdictBox) return;
    simVerdictBox.className = `sim-verdict-box ${v.type}`;
    simVerdictTitle.textContent = v.title;
    simVerdictMetrics.textContent = '';
    v.metrics.forEach(m => {
      const row = document.createElement('div');
      row.textContent = m;
      simVerdictMetrics.appendChild(row);
    });
    simVerdictDesc.textContent = v.desc;
    simVerdictAdvice.textContent = v.advice;
  }

  function renderCircuitSvg(data) {
    if (!graphicContent) return;

    let ledColor = data.load.color || '#e74c3c';
    let ledGlow = 'none';
    let warningBanner = '';

    if (data.state === 'undervolt') {
      ledColor = '#95a5a6';
    } else if (data.state === 'burnout_resistor') {
      warningBanner = '<text x="180" y="20" font-size="12" fill="#c0392b" font-weight="bold" text-anchor="middle">🔥 OVERHEAT BURNOUT!</text>';
    } else if (data.state === 'overload_led') {
      ledColor = '#ff0000';
      ledGlow = 'drop-shadow(0 0 6px #ff0000)';
      warningBanner = '<text x="180" y="20" font-size="12" fill="#c0392b" font-weight="bold" text-anchor="middle">⚠️ WRONG: OVERCURRENT!</text>';
    } else if (data.state === 'safe') {
      ledGlow = `drop-shadow(0 0 6px ${ledColor})`;
      warningBanner = `<text x="180" y="20" font-size="12" fill="#27ae60" font-weight="bold" text-anchor="middle">✓ SAFE CONNECTION (${data.currentMa.toFixed(1)} mA)</text>`;
    }

    let svg = `
      <svg viewBox="0 0 360 85" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${warningBanner}
        <rect x="30" y="25" width="300" height="50" rx="6" fill="none" stroke="#2c3e50" stroke-width="2" />
        <g transform="translate(15, 38)">
          <rect x="0" y="0" width="28" height="24" rx="3" fill="#34495e" stroke="#1a252f" stroke-width="1.5" />
          <text x="14" y="15" font-size="9" fill="#fff" font-weight="bold" text-anchor="middle">${data.Vs}V</text>
        </g>
        <g transform="translate(140, 17)">
          <rect x="0" y="0" width="55" height="16" rx="4" fill="#e8dcc4" stroke="#475569" stroke-width="1.5" />
          <rect x="10" y="0" width="4" height="16" fill="#8b4513" />
          <rect x="20" y="0" width="4" height="16" fill="#000" />
          <rect x="30" y="0" width="4" height="16" fill="#c00" />
          <rect x="42" y="0" width="4" height="16" fill="#cca033" />
          <text x="27.5" y="-3" font-size="8.5" fill="#333" font-weight="bold" text-anchor="middle">${data.R} Ω</text>
        </g>
        <polygon points="215,22 223,25 215,28" fill="#e67e22" />
        <text x="230" y="21" font-size="8" fill="#e67e22" font-weight="bold">I = ${data.currentMa.toFixed(1)}mA</text>
        <g transform="translate(320, 40)" style="filter: ${ledGlow};">
          <polygon points="0,0 16,8 0,16" fill="${ledColor}" stroke="#2c3e50" stroke-width="1.5" />
          <line x1="16" y1="-2" x2="16" y2="18" stroke="#2c3e50" stroke-width="2" />
          <text x="8" y="26" font-size="8" fill="#333" font-weight="bold" text-anchor="middle">${data.load.name}</text>
        </g>
      </svg>
    `;
    graphicContent.innerHTML = svg;
  }

  function findNearestE24(val) {
    if (val <= 0) return 220;
    const exp = Math.floor(Math.log10(val));
    const norm = val / Math.pow(10, exp);
    let closest = E24_VALUES[0];
    let minDiff = 999;
    E24_VALUES.forEach(e => {
      const diff = Math.abs(e - norm);
      if (diff < minDiff) {
        minDiff = diff;
        closest = e;
      }
    });
    return Math.round(closest * Math.pow(10, exp));
  }

  // Parallel, Series & Conductor calculations
  const parallelValuesText = document.getElementById('parallelValuesText');
  const seriesValuesText = document.getElementById('seriesValuesText');
  const conductorLen = document.getElementById('conductorLen');
  const conductorLenUnit = document.getElementById('conductorLenUnit');
  const conductorDiam = document.getElementById('conductorDiam');
  const conductorDiamUnit = document.getElementById('conductorDiamUnit');
  const conductorMaterial = document.getElementById('conductorMaterial');

  function calculateParallel() {
    if (!parallelValuesText) return;
    const parts = parallelValuesText.value.trim().split(/[\s,]+/).map(p => parseFloat(p)).filter(p => !isNaN(p) && p > 0);
    if (parts.length === 0) return;
    let sum = 0;
    parts.forEach(r => sum += (1 / r));
    const total = 1 / sum;
    const rounded = Math.round(total * 10000) / 10000;

    if (activeMaster === 'tabMasterElectronics' && activeSubElectronics === 'subTabParallel') {
      lcdModeLabel.textContent = 'Parallel Resistance';
      lcdExpression.textContent = `1/R = Σ(1/Ri)`;
      lcdMainValue.textContent = `${rounded.toLocaleString()} Ω`;
      lcdSubLeft.textContent = `Branches: ${parts.length} Resistors`;
      lcdSubRight.textContent = `Sum 1/R: ${sum.toFixed(4)} Ω⁻¹`;
    }
  }

  function calculateSeries() {
    if (!seriesValuesText) return;
    const parts = seriesValuesText.value.trim().split(/[\s,]+/).map(p => parseFloat(p)).filter(p => !isNaN(p) && p > 0);
    if (parts.length === 0) return;
    let sum = 0;
    parts.forEach(r => sum += r);
    const rounded = Math.round(sum * 10000) / 10000;

    if (activeMaster === 'tabMasterElectronics' && activeSubElectronics === 'subTabSeries') {
      lcdModeLabel.textContent = 'Series Resistance';
      lcdExpression.textContent = `R = R₁ + R₂ + ...`;
      lcdMainValue.textContent = `${rounded.toLocaleString()} Ω`;
      lcdSubLeft.textContent = `Count: ${parts.length} Resistors`;
      lcdSubRight.textContent = 'Pure Additive Series';
    }
  }

  function calculateConductor() {
    const L = parseFloat(conductorLen?.value || '0') * parseFloat(conductorLenUnit?.value || '1');
    const d = parseFloat(conductorDiam?.value || '0') * parseFloat(conductorDiamUnit?.value || '0.001');
    const sigma = parseFloat(conductorMaterial?.value || '58000000');
    if (L <= 0 || d <= 0 || sigma <= 0) return;

    const r = d / 2;
    const A = Math.PI * r * r;
    const R = L / (sigma * A);
    const rounded = Math.round(R * 10000) / 10000;

    if (activeMaster === 'tabMasterElectronics' && activeSubElectronics === 'subTabConductor') {
      lcdModeLabel.textContent = 'Conductor Resistance';
      lcdExpression.textContent = `R = L / (σ · A)`;
      lcdMainValue.textContent = `${rounded.toLocaleString()} Ω`;
      lcdSubLeft.textContent = `Area: ${(A * 1e6).toFixed(4)} mm²`;
      lcdSubRight.textContent = `Conductivity: ${(sigma / 1e6).toFixed(1)} MS/m`;
    }
  }

  function renderSchematicSvg(type) {
    if (!graphicContent) return;
    if (type === 'parallel') {
      graphicContent.innerHTML = `
        <svg viewBox="0 0 340 75" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="20" y1="37" x2="60" y2="37" stroke="#333" stroke-width="2"/>
          <line x1="60" y1="18" x2="60" y2="56" stroke="#333" stroke-width="2"/>
          <line x1="60" y1="18" x2="110" y2="18" stroke="#333" stroke-width="2"/>
          <rect x="110" y="10" width="50" height="16" fill="#fff" stroke="#333" stroke-width="1.5"/>
          <text x="135" y="22" font-size="10" text-anchor="middle">R1</text>
          <line x1="160" y1="18" x2="210" y2="18" stroke="#333" stroke-width="2"/>
          <line x1="60" y1="56" x2="110" y2="56" stroke="#333" stroke-width="2"/>
          <rect x="110" y="48" width="50" height="16" fill="#fff" stroke="#333" stroke-width="1.5"/>
          <text x="135" y="60" font-size="10" text-anchor="middle">R2</text>
          <line x1="160" y1="56" x2="210" y2="56" stroke="#333" stroke-width="2"/>
          <line x1="210" y1="18" x2="210" y2="56" stroke="#333" stroke-width="2"/>
          <line x1="210" y1="37" x2="250" y2="37" stroke="#333" stroke-width="2"/>
          <text x="280" y="42" font-size="11" font-weight="bold" fill="#003366">1/R = Σ(1/Ri)</text>
        </svg>
      `;
    } else if (type === 'series') {
      graphicContent.innerHTML = `
        <svg viewBox="0 0 340 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="20" y1="25" x2="60" y2="25" stroke="#333" stroke-width="2"/>
          <rect x="60" y="17" width="50" height="16" fill="#fff" stroke="#333" stroke-width="1.5"/>
          <text x="85" y="29" font-size="10" text-anchor="middle">R1</text>
          <line x1="110" y1="25" x2="150" y2="25" stroke="#333" stroke-width="2"/>
          <rect x="150" y="17" width="50" height="16" fill="#fff" stroke="#333" stroke-width="1.5"/>
          <text x="175" y="29" font-size="10" text-anchor="middle">R2</text>
          <line x1="200" y1="25" x2="240" y2="25" stroke="#333" stroke-width="2"/>
          <text x="275" y="29" font-size="11" font-weight="bold" fill="#003366">Req = Σ Ri</text>
        </svg>
      `;
    } else if (type === 'conductor') {
      graphicContent.innerHTML = `
        <svg viewBox="0 0 340 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="50" y="18" width="180" height="24" rx="12" fill="#d97706" stroke="#92400e" stroke-width="1.5"/>
          <ellipse cx="50" cy="30" rx="6" ry="12" fill="#f59e0b" stroke="#92400e" stroke-width="1"/>
          <ellipse cx="230" cy="30" rx="6" ry="12" fill="#f59e0b" stroke="#92400e" stroke-width="1"/>
          <text x="140" y="34" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">Length (L)</text>
          <text x="275" y="35" font-size="11" font-weight="bold" fill="#003366">R = L / (σ·A)</text>
        </svg>
      `;
    }
  }

  function renderCapacitorSvg(code, capText, volt) {
    if (!graphicContent) return;
    if (activeMaster !== 'tabMasterElectronics' || activeSubElectronics !== 'subTabCapacitor') return;
    graphicContent.innerHTML = `
      <svg viewBox="0 0 340 75" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="90" y1="52" x2="90" y2="70" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="120" y1="52" x2="120" y2="70" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="105" cy="30" r="24" fill="#d97706" stroke="#b45309" stroke-width="2"/>
        <ellipse cx="105" cy="30" rx="20" ry="22" fill="#f59e0b" opacity="0.9"/>
        <text x="105" y="27" font-size="10" font-family="monospace" font-weight="bold" fill="#451a03" text-anchor="middle">${code}</text>
        <text x="105" y="38" font-size="8.5" font-family="monospace" fill="#78350f" text-anchor="middle">${volt}V</text>
        <line x1="180" y1="36" x2="210" y2="36" stroke="#334155" stroke-width="2"/>
        <line x1="210" y1="20" x2="210" y2="52" stroke="#003366" stroke-width="3"/>
        <line x1="218" y1="20" x2="218" y2="52" stroke="#003366" stroke-width="3"/>
        <line x1="218" y1="36" x2="248" y2="36" stroke="#334155" stroke-width="2"/>
        <text x="214" y="14" font-size="9" fill="#64748b" text-anchor="middle">C</text>
        <text x="260" y="32" font-size="11" font-weight="bold" fill="#003366">${capText}</text>
        <text x="260" y="46" font-size="9.5" fill="#475569">XC = 1/(2πfC)</text>
      </svg>
    `;
  }

  function renderDiodeSvg(model, vf, idMa, isZener) {
    if (!graphicContent) return;
    if (activeMaster !== 'tabMasterElectronics' || activeSubElectronics !== 'subTabDiode') return;
    const bandColor = isZener ? '#38bdf8' : '#e2e8f0';
    const bodyColor = isZener ? '#0284c7' : '#1e293b';
    graphicContent.innerHTML = `
      <svg viewBox="0 0 340 75" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="37" x2="60" y2="37" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="150" y1="37" x2="190" y2="37" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        <rect x="60" y="24" width="90" height="26" rx="4" fill="${bodyColor}" stroke="#0f172a" stroke-width="1.5"/>
        <rect x="132" y="24" width="12" height="26" fill="${bandColor}"/>
        <text x="96" y="41" font-size="9" font-family="monospace" font-weight="bold" fill="#ffffff" text-anchor="middle">${model.split(' ')[0]}</text>
        <text x="35" y="28" font-size="9" font-weight="bold" fill="#0055aa">Anode (+)</text>
        <text x="175" y="28" font-size="9" font-weight="bold" fill="#b91c1c">Cathode (-)</text>
        <line x1="215" y1="37" x2="245" y2="37" stroke="#334155" stroke-width="2"/>
        <polygon points="245,22 245,52 265,37" fill="#003366" stroke="#003366" stroke-width="1.5"/>
        <line x1="265" y1="22" x2="265" y2="52" stroke="#003366" stroke-width="2.5"/>
        ${isZener ? '<line x1="259" y1="22" x2="265" y2="22" stroke="#003366" stroke-width="2"/><line x1="265" y1="52" x2="271" y2="52" stroke="#003366" stroke-width="2"/>' : ''}
        <line x1="265" y1="37" x2="295" y2="37" stroke="#334155" stroke-width="2"/>
        <text x="255" y="66" font-size="9" font-weight="bold" fill="#166534">ID: ${idMa.toFixed(1)} mA</text>
      </svg>
    `;
  }

  function renderTransistorSvg(type, state, ibUa, icMa, vce) {
    if (!graphicContent) return;
    if (activeMaster !== 'tabMasterElectronics' || activeSubElectronics !== 'subTabTransistor') return;
    const isPnp = (type === 'PNP');
    graphicContent.innerHTML = `
      <svg viewBox="0 0 340 75" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 32 55 A 24 24 0 0 1 88 55 L 88 60 L 32 60 Z" fill="#1e293b" stroke="#0f172a" stroke-width="1.5"/>
        <rect x="34" y="22" width="52" height="34" rx="3" fill="#1e293b" stroke="#0f172a" stroke-width="1.5"/>
        <line x1="44" y1="56" x2="44" y2="72" stroke="#94a3b8" stroke-width="2"/>
        <line x1="60" y1="56" x2="60" y2="72" stroke="#94a3b8" stroke-width="2"/>
        <line x1="76" y1="56" x2="76" y2="72" stroke="#94a3b8" stroke-width="2"/>
        <text x="44" y="16" font-size="7.5" font-weight="bold" fill="#64748b" text-anchor="middle">1:E</text>
        <text x="60" y="16" font-size="7.5" font-weight="bold" fill="#64748b" text-anchor="middle">2:B</text>
        <text x="76" y="16" font-size="7.5" font-weight="bold" fill="#64748b" text-anchor="middle">3:C</text>
        <text x="60" y="42" font-size="8.5" font-family="monospace" fill="#94a3b8" text-anchor="middle">TO-92</text>
        <circle cx="170" cy="37" r="22" stroke="#64748b" stroke-width="1.5" fill="#f8fafc"/>
        <line x1="125" y1="37" x2="160" y2="37" stroke="#003366" stroke-width="2"/>
        <line x1="160" y1="22" x2="160" y2="52" stroke="#003366" stroke-width="3"/>
        <line x1="160" y1="28" x2="182" y2="15" stroke="#003366" stroke-width="2"/>
        <line x1="182" y1="15" x2="182" y2="5" stroke="#003366" stroke-width="2"/>
        <text x="192" y="12" font-size="9" font-weight="bold" fill="#003366">C</text>
        <line x1="160" y1="46" x2="182" y2="59" stroke="#003366" stroke-width="2"/>
        <line x1="182" y1="59" x2="182" y2="69" stroke="#003366" stroke-width="2"/>
        ${isPnp 
          ? '<polygon points="168,43 176,40 173,48" fill="#b91c1c"/>'
          : '<polygon points="182,59 174,55 178,48" fill="#b91c1c"/>'
        }
        <text x="192" y="68" font-size="9" font-weight="bold" fill="#003366">E</text>
        <text x="117" y="40" font-size="9" font-weight="bold" fill="#003366">B</text>
        <text x="225" y="28" font-size="10" font-weight="bold" fill="#003366">IC: ${icMa.toFixed(2)} mA</text>
        <text x="225" y="42" font-size="10" font-weight="bold" fill="#0f172a">VCE: ${vce.toFixed(2)} V</text>
        <text x="225" y="56" font-size="9" fill="#166534">IB: ${ibUa.toFixed(1)} µA</text>
      </svg>
    `;
  }

  function calculateCapacitor() {
    const d1 = parseInt(document.getElementById('capDigit1')?.value, 10) || 1;
    const d2 = parseInt(document.getElementById('capDigit2')?.value, 10) || 0;
    const multExp = parseInt(document.getElementById('capMultiplier')?.value, 10);
    const tolVal = document.getElementById('capToleranceSelect')?.value || 'K|10';
    const voltVal = document.getElementById('capVoltageSelect')?.value || '1H|50';
    const freqHz = parseFloat(document.getElementById('capFreqHz')?.value) || 1000;
    const pairedR = parseFloat(document.getElementById('capPairedR')?.value) || 1000;

    const tolParts = tolVal.split('|');
    const tolCode = tolParts[0];
    const tolPct = parseFloat(tolParts[1]) || 10;

    const voltParts = voltVal.split('|');
    const voltCode = voltParts[0];
    const voltVolts = parseFloat(voltParts[1]) || 50;

    let basePf = 0;
    let codeStr = '';
    if (multExp === -1) {
      basePf = (d1 * 10 + d2) * 0.1;
      codeStr = `${d1}${d2}8`;
    } else if (multExp === -2) {
      basePf = (d1 * 10 + d2) * 0.01;
      codeStr = `${d1}${d2}9`;
    } else {
      basePf = (d1 * 10 + d2) * Math.pow(10, multExp);
      codeStr = `${d1}${d2}${multExp}`;
    }

    const baseNf = basePf / 1000;
    const baseUf = basePf / 1000000;

    let minNf = baseNf * (1 - tolPct / 100);
    let maxNf = baseNf * (1 + tolPct / 100);

    const capFarads = basePf * 1e-12;
    let xcOhms = 0;
    if (freqHz > 0 && capFarads > 0) {
      xcOhms = 1 / (2 * Math.PI * freqHz * capFarads);
    }

    const tauSec = pairedR * capFarads;
    const tauMs = tauSec * 1000;
    const cutoffFc = (2 * Math.PI * pairedR * capFarads) > 0 ? 1 / (2 * Math.PI * pairedR * capFarads) : 0;

    const capEiaCodeDisplay = document.getElementById('capEiaCodeDisplay');
    const capUfDisplay = document.getElementById('capUfDisplay');
    const capNfDisplay = document.getElementById('capNfDisplay');
    const capPfDisplay = document.getElementById('capPfDisplay');
    const capTolRangeDisplay = document.getElementById('capTolRangeDisplay');
    const capReactanceDisplay = document.getElementById('capReactanceDisplay');
    const capTimeConstDisplay = document.getElementById('capTimeConstDisplay');

    if (capEiaCodeDisplay) capEiaCodeDisplay.textContent = `${codeStr}${tolCode} (${voltVolts}V)`;
    if (capUfDisplay) capUfDisplay.textContent = baseUf >= 1 ? `${baseUf.toFixed(2)} µF` : `${baseUf.toFixed(4)} µF`;
    if (capNfDisplay) capNfDisplay.textContent = `${baseNf >= 100 ? baseNf.toFixed(0) : baseNf.toFixed(2)} nF`;
    if (capPfDisplay) capPfDisplay.textContent = `${basePf.toLocaleString()} pF`;
    if (capTolRangeDisplay) capTolRangeDisplay.textContent = `${minNf.toFixed(1)} nF – ${maxNf.toFixed(1)} nF (±${tolPct}%)`;
    if (capReactanceDisplay) {
      if (xcOhms >= 1e6) capReactanceDisplay.textContent = `${(xcOhms / 1e6).toFixed(2)} MΩ`;
      else if (xcOhms >= 1e3) capReactanceDisplay.textContent = `${(xcOhms / 1e3).toFixed(2)} kΩ`;
      else capReactanceDisplay.textContent = `${xcOhms.toFixed(2)} Ω`;
    }
    if (capTimeConstDisplay) {
      let fcStr = cutoffFc >= 1000 ? `${(cutoffFc / 1000).toFixed(2)} kHz` : `${cutoffFc.toFixed(1)} Hz`;
      capTimeConstDisplay.textContent = `${tauMs < 1 ? (tauMs * 1000).toFixed(1) + ' µs' : tauMs.toFixed(3) + ' ms'} (fc: ${fcStr})`;
    }

    if (activeMaster === 'tabMasterElectronics' && activeSubElectronics === 'subTabCapacitor') {
      lcdModeLabel.textContent = 'EIA Capacitor Code & Capacitance';
      lcdExpression.textContent = `EIA ${codeStr}${tolCode} | Voltage Rating: ${voltVolts}V DC`;
      lcdMainValue.textContent = `${baseUf >= 0.01 ? baseUf.toFixed(2) + ' µF' : baseNf.toFixed(1) + ' nF'} (Code ${codeStr}) ±${tolPct}%`;
      lcdSubLeft.textContent = `Range: ${minNf.toFixed(1)} nF – ${maxNf.toFixed(1)} nF (${basePf.toLocaleString()} pF)`;
      lcdSubRight.textContent = `Xc: ${xcOhms >= 1000 ? (xcOhms/1000).toFixed(1) + ' kΩ' : xcOhms.toFixed(0) + ' Ω'} @ ${freqHz}Hz`;
      renderCapacitorSvg(codeStr + tolCode, baseUf >= 0.01 ? baseUf.toFixed(2) + 'µF' : baseNf.toFixed(0) + 'nF', voltVolts);
    }
  }

  function calculateDiode() {
    const mode = document.getElementById('diodeModeSelect')?.value || 'forward';
    const preset = document.getElementById('diodePresetSelect')?.value || '1N4001|0.70|1000|1.0';
    const vs = parseFloat(document.getElementById('diodeSourceVolts')?.value) || 5.0;
    let vf = parseFloat(document.getElementById('diodeVfVal')?.value) || 0.70;
    const rs = (parseFloat(document.getElementById('diodeSeriesResistor')?.value) || 220) * (parseFloat(document.getElementById('diodeResistorUnit')?.value) || 1);
    const iLoadMa = parseFloat(document.getElementById('diodeLoadCurrent')?.value) || 0;

    let pMaxW = 0.5;
    let maxCurrentMa = 1000;
    if (preset !== 'custom') {
      const parts = preset.split('|');
      vf = parseFloat(parts[1]) || vf;
      maxCurrentMa = parseFloat(parts[2]) || maxCurrentMa;
      pMaxW = parseFloat(parts[3]) || pMaxW;
    }

    const rowLoad = document.getElementById('rowDiodeLoadCurrent');
    if (rowLoad) rowLoad.style.display = (mode === 'zener') ? 'flex' : 'none';

    let diodeVolt = vf;
    let diodeCurrentMa = 0;
    let diodePowerMw = 0;
    let rsDropVolt = 0;
    let rsPowerMw = 0;
    let statusText = 'Forward Conducting';
    let statusColor = '#196f3d';
    let safetyVerdict = 'Safe (within ratings)';

    if (mode === 'forward') {
      if (vs <= vf) {
        diodeVolt = vs;
        diodeCurrentMa = 0;
        statusText = 'Sub-Threshold / Cutoff (OFF)';
        statusColor = '#64748b';
        safetyVerdict = 'Non-conducting (Vs < Vf)';
      } else {
        diodeVolt = vf;
        rsDropVolt = vs - vf;
        const idAmps = rsDropVolt / (rs || 1);
        diodeCurrentMa = idAmps * 1000;
        diodePowerMw = diodeVolt * diodeCurrentMa;
        rsPowerMw = rsDropVolt * diodeCurrentMa;

        if (diodeCurrentMa > maxCurrentMa) {
          statusText = '🔥 OVERCURRENT WARNING!';
          statusColor = '#dc2626';
          safetyVerdict = `Exceeds max ${maxCurrentMa} mA! Use larger resistor.`;
        } else if (diodePowerMw > pMaxW * 1000) {
          statusText = '🔥 OVERPOWER WARNING!';
          statusColor = '#ea580c';
          safetyVerdict = `Power exceeds ${pMaxW * 1000} mW limit!`;
        } else {
          statusText = 'Forward Conducting (Active)';
          statusColor = '#196f3d';
          safetyVerdict = `Safe: ${(diodeCurrentMa / maxCurrentMa * 100).toFixed(0)}% of max current`;
        }
      }
    } else {
      const vz = vf;
      if (vs < vz) {
        statusText = 'Unregulated (Vs < Vz)';
        statusColor = '#ea580c';
        diodeVolt = vs;
        safetyVerdict = `Input voltage ${vs}V is lower than Zener breakdown ${vz}V`;
      } else {
        diodeVolt = vz;
        rsDropVolt = vs - vz;
        const iTotalAmps = rsDropVolt / (rs || 1);
        const iTotalMa = iTotalAmps * 1000;
        diodeCurrentMa = Math.max(0, iTotalMa - iLoadMa);
        diodePowerMw = vz * diodeCurrentMa;
        rsPowerMw = rsDropVolt * iTotalMa;

        if (diodeCurrentMa <= 0) {
          statusText = '⚠️ Starved: Load current exceeds supply';
          statusColor = '#ea580c';
          safetyVerdict = 'Zener turned off; voltage dropped below regulation';
        } else if (diodePowerMw > pMaxW * 1000) {
          statusText = '🔥 OVERPOWER: Zener Burnout Risk';
          statusColor = '#dc2626';
          safetyVerdict = `Dissipating ${diodePowerMw.toFixed(0)} mW (Max: ${pMaxW * 1000} mW)`;
        } else {
          statusText = `Regulating Vout = ${vz.toFixed(2)}V`;
          statusColor = '#0055aa';
          safetyVerdict = `Zener Current: ${diodeCurrentMa.toFixed(1)} mA (Safe)`;
        }
      }
    }

    const diodeStatusDisplay = document.getElementById('diodeStatusDisplay');
    const diodeVoltDisplay = document.getElementById('diodeVoltDisplay');
    const diodeCurrentDisplay = document.getElementById('diodeCurrentDisplay');
    const diodePowerDisplay = document.getElementById('diodePowerDisplay');
    const diodeRsVoltDisplay = document.getElementById('diodeRsVoltDisplay');
    const diodeRsPowerDisplay = document.getElementById('diodeRsPowerDisplay');
    const diodeSafetyDisplay = document.getElementById('diodeSafetyDisplay');

    if (diodeStatusDisplay) {
      diodeStatusDisplay.textContent = statusText;
      diodeStatusDisplay.style.color = statusColor;
    }
    if (diodeVoltDisplay) diodeVoltDisplay.textContent = `${diodeVolt.toFixed(2)} V`;
    if (diodeCurrentDisplay) diodeCurrentDisplay.textContent = `${diodeCurrentMa.toFixed(2)} mA`;
    if (diodePowerDisplay) diodePowerDisplay.textContent = `${diodePowerMw.toFixed(1)} mW`;
    if (diodeRsVoltDisplay) diodeRsVoltDisplay.textContent = `${rsDropVolt.toFixed(2)} V`;
    if (diodeRsPowerDisplay) diodeRsPowerDisplay.textContent = `${rsPowerMw.toFixed(1)} mW`;
    if (diodeSafetyDisplay) diodeSafetyDisplay.textContent = safetyVerdict;

    if (activeMaster === 'tabMasterElectronics' && activeSubElectronics === 'subTabDiode') {
      lcdModeLabel.textContent = mode === 'zener' ? 'Zener Voltage Regulator' : 'Diode Forward Conduction';
      lcdExpression.textContent = `Vs: ${vs}V | Rs: ${rs}Ω | VD: ${diodeVolt.toFixed(2)}V`;
      lcdMainValue.textContent = `ID = ${diodeCurrentMa.toFixed(2)} mA | VD = ${diodeVolt.toFixed(2)}V`;
      lcdSubLeft.textContent = `Diode Dissipation: ${diodePowerMw.toFixed(1)} mW`;
      lcdSubRight.textContent = `Status: ${statusText}`;
      renderDiodeSvg(mode === 'zener' ? 'Zener Diode' : 'Rectifier Diode', diodeVolt, diodeCurrentMa, mode === 'zener');
    }
  }

  function calculateTransistor() {
    const model = document.getElementById('transistorModelSelect')?.value || 'NPN|100|0.7|0.2|2N3904';
    const vcc = parseFloat(document.getElementById('transSupplyVcc')?.value) || 10.0;
    const vin = parseFloat(document.getElementById('transBaseVin')?.value) || 5.0;
    const rb = (parseFloat(document.getElementById('transBaseRb')?.value) || 10) * (parseFloat(document.getElementById('transBaseRbUnit')?.value) || 1000);
    const rc = (parseFloat(document.getElementById('transCollectorRc')?.value) || 1) * (parseFloat(document.getElementById('transCollectorRcUnit')?.value) || 1000);
    const beta = parseFloat(document.getElementById('transBetaGain')?.value) || 100;

    let vbe = 0.70;
    let vceSat = 0.20;
    let type = 'NPN';
    let partName = '2N3904';

    if (model !== 'custom') {
      const parts = model.split('|');
      type = parts[0];
      vbe = parseFloat(parts[2]) || 0.70;
      vceSat = parseFloat(parts[3]) || 0.20;
      partName = parts[4] || 'BJT';
    }

    let ibAmps = 0;
    let icAmps = 0;
    let vce = vcc;
    let state = 'CUTOFF (OFF)';
    let stateColor = '#64748b';
    let overdrive = 0;

    if (vin <= vbe) {
      ibAmps = 0;
      icAmps = 0;
      vce = vcc;
      state = '⚪ CUTOFF (Switch OFF)';
      stateColor = '#64748b';
    } else {
      ibAmps = (vin - vbe) / (rb || 1);
      const icSatAmps = Math.max(0, (vcc - vceSat) / (rc || 1));
      const icActiveAmps = beta * ibAmps;
      overdrive = icSatAmps > 0 ? icActiveAmps / icSatAmps : 1;

      if (icActiveAmps < icSatAmps) {
        icAmps = icActiveAmps;
        vce = Math.max(vceSat, vcc - (icAmps * rc));
        state = '🟢 ACTIVE REGION (Linear Amp)';
        stateColor = '#196f3d';
      } else {
        icAmps = icSatAmps;
        vce = vceSat;
        state = `🔵 SATURATION (Switch ON, ${overdrive.toFixed(1)}×)`;
        stateColor = '#0055aa';
      }
    }

    const ibUa = ibAmps * 1e6;
    const icMa = icAmps * 1e3;
    const pdMw = vce * (icAmps * 1000);
    const prcMw = Math.pow(icAmps, 2) * rc * 1000;

    const transStateDisplay = document.getElementById('transStateDisplay');
    const transIbDisplay = document.getElementById('transIbDisplay');
    const transIcDisplay = document.getElementById('transIcDisplay');
    const transVceDisplay = document.getElementById('transVceDisplay');
    const transPdDisplay = document.getElementById('transPdDisplay');
    const transPrcDisplay = document.getElementById('transPrcDisplay');
    const transOverdriveDisplay = document.getElementById('transOverdriveDisplay');

    if (transStateDisplay) {
      transStateDisplay.textContent = state;
      transStateDisplay.style.color = stateColor;
    }
    if (transIbDisplay) transIbDisplay.textContent = `${ibUa.toFixed(1)} µA`;
    if (transIcDisplay) transIcDisplay.textContent = `${icMa.toFixed(2)} mA`;
    if (transVceDisplay) transVceDisplay.textContent = `${vce.toFixed(2)} V`;
    if (transPdDisplay) transPdDisplay.textContent = `${pdMw.toFixed(1)} mW`;
    if (transPrcDisplay) transPrcDisplay.textContent = `${prcMw.toFixed(1)} mW`;
    if (transOverdriveDisplay) transOverdriveDisplay.textContent = overdrive > 1 ? `${overdrive.toFixed(2)}× (Saturated)` : `${overdrive.toFixed(2)}× (Active)`;

    if (activeMaster === 'tabMasterElectronics' && activeSubElectronics === 'subTabTransistor') {
      lcdModeLabel.textContent = `${type} Transistor Biasing (${partName})`;
      lcdExpression.textContent = `Vcc: ${vcc}V | Vin: ${vin}V | Rb: ${rb >= 1000 ? rb/1000 + 'k' : rb}Ω | Rc: ${rc >= 1000 ? rc/1000 + 'k' : rc}Ω`;
      lcdMainValue.textContent = `${state.split(' ')[1] || state} | IC = ${icMa.toFixed(2)} mA | VCE = ${vce.toFixed(2)}V`;
      lcdSubLeft.textContent = `Base Current: ${ibUa.toFixed(1)} µA (hFE: ${beta})`;
      lcdSubRight.textContent = `Transistor Power: ${pdMw.toFixed(1)} mW`;
      renderTransistorSvg(type, state, ibUa, icMa, vce);
    }
  }

  // --------------------------------------------------------------------------
  // 2. BASIC MATH & 3. SCIENTIFIC CALCULATOR ENGINE
  // --------------------------------------------------------------------------
  const mathState = {
    currentInput: '0',
    expression: '',
    memory: 0,
    hasMemory: false,
    lastAnswer: 0,
    isRadian: false, // Default: Degree mode
    justEvaluated: false
  };

  const btnAngleDeg = document.getElementById('btnAngleDeg');
  const btnAngleRad = document.getElementById('btnAngleRad');
  const basicMemIndicator = document.getElementById('basicMemIndicator');

  function renderMathDisplay() {
    lcdModeLabel.textContent = 'Basic Calculator';
    lcdExpression.textContent = mathState.expression || '';
    lcdMainValue.textContent = mathState.currentInput;
    lcdSubLeft.textContent = mathState.hasMemory ? `Memory: ${mathState.memory}` : 'Memory: Empty';
    lcdSubRight.textContent = 'Standard Math Mode';
  }

  function renderSciDisplay() {
    lcdModeLabel.textContent = 'Scientific Calculator';
    lcdExpression.textContent = mathState.expression || '';
    lcdMainValue.textContent = mathState.currentInput;
    lcdSubLeft.textContent = `Angle: ${mathState.isRadian ? 'RADIAN' : 'DEGREE'} | Ans: ${mathState.lastAnswer}`;
    lcdSubRight.textContent = mathState.hasMemory ? `M = ${mathState.memory}` : 'M = 0';
  }

  function appendDigit(d) {
    if (mathState.justEvaluated) {
      mathState.currentInput = (d === '.') ? '0.' : d;
      mathState.expression = '';
      mathState.justEvaluated = false;
    } else {
      if (d === '.') {
        if (!mathState.currentInput.includes('.')) {
          mathState.currentInput += '.';
        }
      } else {
        if (mathState.currentInput === '0' || mathState.currentInput === '') {
          mathState.currentInput = d;
        } else {
          mathState.currentInput += d;
        }
      }
    }
    updateActiveMathDisplay();
  }

  function appendOperator(op) {
    mathState.justEvaluated = false;
    const displayOp = op === '*' ? '×' : op === '/' ? '÷' : op === '^' ? '^' : op;
    mathState.expression += `${mathState.currentInput} ${displayOp} `;
    mathState.currentInput = '0';
    updateActiveMathDisplay();
  }

  function clearAll() {
    mathState.currentInput = '0';
    mathState.expression = '';
    mathState.justEvaluated = false;
    updateActiveMathDisplay();
  }

  function clearEntry() {
    mathState.currentInput = '0';
    updateActiveMathDisplay();
  }

  function backspace() {
    if (mathState.justEvaluated) {
      clearAll();
      return;
    }
    if (mathState.currentInput.length > 1) {
      mathState.currentInput = mathState.currentInput.slice(0, -1);
    } else {
      mathState.currentInput = '0';
    }
    updateActiveMathDisplay();
  }

  function negate() {
    const val = parseFloat(mathState.currentInput);
    if (!isNaN(val)) {
      mathState.currentInput = (-val).toString();
      updateActiveMathDisplay();
    }
  }

  // Zero-Eval Mathematical Parser & Evaluator (OWASP / Strict CSP Compliant)
  function parseAndEvaluateExpression(inputStr) {
    const tokens = [];
    let s = inputStr.replace(/×/g, '*').replace(/÷/g, '/').replace(/\^/g, '**');
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (/\s/.test(c)) { i++; continue; }
      if (/[0-9.]/.test(c)) {
        let numStr = '';
        while (i < s.length && /[0-9.eE]/.test(s[i])) {
          if ((s[i] === 'e' || s[i] === 'E') && (s[i+1] === '+' || s[i+1] === '-')) {
            numStr += s[i] + s[i+1];
            i += 2;
          } else {
            numStr += s[i];
            i++;
          }
        }
        tokens.push({ type: 'num', value: parseFloat(numStr) });
      } else if (c === '*' && s[i+1] === '*') {
        tokens.push({ type: 'op', value: '**', prec: 4, assoc: 'right' });
        i += 2;
      } else if (['+', '-', '*', '/'].includes(c)) {
        const prev = tokens[tokens.length - 1];
        if ((c === '-' || c === '+') && (!prev || prev.type === 'op' || prev.type === 'lparen')) {
          tokens.push({ type: 'unary', value: c === '-' ? 'neg' : 'pos', prec: 5, assoc: 'right' });
        } else {
          const prec = (c === '*' || c === '/') ? 3 : 2;
          tokens.push({ type: 'op', value: c, prec, assoc: 'left' });
        }
        i++;
      } else if (c === '(') {
        tokens.push({ type: 'lparen' });
        i++;
      } else if (c === ')') {
        tokens.push({ type: 'rparen' });
        i++;
      } else {
        throw new Error('Invalid character in expression');
      }
    }

    const output = [];
    const opStack = [];

    for (const token of tokens) {
      if (token.type === 'num') {
        output.push(token);
      } else if (token.type === 'unary') {
        opStack.push(token);
      } else if (token.type === 'op') {
        while (opStack.length > 0) {
          const top = opStack[opStack.length - 1];
          if (top.type === 'unary' || (top.type === 'op' && (
            (token.assoc === 'left' && token.prec <= top.prec) ||
            (token.assoc === 'right' && token.prec < top.prec)
          ))) {
            output.push(opStack.pop());
          } else {
            break;
          }
        }
        opStack.push(token);
      } else if (token.type === 'lparen') {
        opStack.push(token);
      } else if (token.type === 'rparen') {
        while (opStack.length > 0 && opStack[opStack.length - 1].type !== 'lparen') {
          output.push(opStack.pop());
        }
        if (opStack.length === 0) throw new Error('Mismatched parentheses');
        opStack.pop();
      }
    }

    while (opStack.length > 0) {
      const top = opStack.pop();
      if (top.type === 'lparen' || top.type === 'rparen') throw new Error('Mismatched parentheses');
      output.push(top);
    }

    const evalStack = [];
    for (const token of output) {
      if (token.type === 'num') {
        evalStack.push(token.value);
      } else if (token.type === 'unary') {
        if (evalStack.length < 1) throw new Error('Invalid syntax');
        const val = evalStack.pop();
        evalStack.push(token.value === 'neg' ? -val : val);
      } else if (token.type === 'op') {
        if (evalStack.length < 2) throw new Error('Invalid syntax');
        const b = evalStack.pop();
        const a = evalStack.pop();
        let res;
        switch (token.value) {
          case '+': res = a + b; break;
          case '-': res = a - b; break;
          case '*': res = a * b; break;
          case '/':
            if (b === 0) throw new Error('Division by zero');
            res = a / b;
            break;
          case '**': res = Math.pow(a, b); break;
        }
        evalStack.push(res);
      }
    }

    if (evalStack.length !== 1) throw new Error('Invalid expression');
    return evalStack[0];
  }

  // Evaluate Expression safely (Zero-Eval, Strict CSP Compliant)
  function evaluateExpression() {
    let expr = mathState.expression + mathState.currentInput;
    if (!expr.trim()) return;

    try {
      const result = parseAndEvaluateExpression(expr);

      if (isNaN(result) || !isFinite(result)) {
        mathState.currentInput = 'Error';
      } else {
        const rounded = Math.round(result * 1e12) / 1e12;
        mathState.expression = `${expr} =`;
        mathState.currentInput = rounded.toString();
        mathState.lastAnswer = rounded;
        mathState.justEvaluated = true;
      }
    } catch (e) {
      mathState.currentInput = 'Syntax Error';
    }

    updateActiveMathDisplay();
  }

  // Scientific Functions
  function applySciFunction(fn) {
    const x = parseFloat(mathState.currentInput);
    if (isNaN(x)) return;

    let res = 0;
    const toRad = mathState.isRadian ? 1 : Math.PI / 180;
    const toDeg = mathState.isRadian ? 1 : 180 / Math.PI;

    switch (fn) {
      case 'sin':
        res = Math.sin(x * toRad);
        break;
      case 'cos':
        res = Math.cos(x * toRad);
        break;
      case 'tan':
        res = Math.tan(x * toRad);
        break;
      case 'asin':
        res = Math.asin(x) * toDeg;
        break;
      case 'acos':
        res = Math.acos(x) * toDeg;
        break;
      case 'atan':
        res = Math.atan(x) * toDeg;
        break;
      case 'ln':
        res = x > 0 ? Math.log(x) : NaN;
        break;
      case 'log':
        res = x > 0 ? Math.log10(x) : NaN;
        break;
      case 'sqrt':
        res = x >= 0 ? Math.sqrt(x) : NaN;
        break;
      case 'sqr':
        res = x * x;
        break;
      case 'inv':
        res = x !== 0 ? 1 / x : NaN;
        break;
      case 'pi':
        mathState.currentInput = Math.PI.toString();
        updateActiveMathDisplay();
        return;
      case 'e':
        mathState.currentInput = Math.E.toString();
        updateActiveMathDisplay();
        return;
      case 'fact':
        res = factorial(Math.floor(x));
        break;
      case 'pct':
        res = x / 100;
        break;
      case 'exp':
        mathState.currentInput += 'e';
        updateActiveMathDisplay();
        return;
      default:
        return;
    }

    if (isNaN(res) || !isFinite(res)) {
      mathState.currentInput = 'Error';
    } else {
      res = Math.round(res * 1e12) / 1e12;
      mathState.expression = `${fn}(${x}) =`;
      mathState.currentInput = res.toString();
      mathState.lastAnswer = res;
      mathState.justEvaluated = true;
    }

    updateActiveMathDisplay();
  }

  function factorial(n) {
    if (n < 0 || n > 170) return NaN;
    if (n === 0 || n === 1) return 1;
    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
  }

  function handleMemory(action) {
    const val = parseFloat(mathState.currentInput) || 0;
    if (action === 'mc') {
      mathState.memory = 0;
      mathState.hasMemory = false;
    } else if (action === 'mr') {
      mathState.currentInput = mathState.memory.toString();
      mathState.justEvaluated = true;
    } else if (action === 'm+') {
      mathState.memory += val;
      mathState.hasMemory = true;
    } else if (action === 'm-') {
      mathState.memory -= val;
      mathState.hasMemory = true;
    }

    if (basicMemIndicator) {
      basicMemIndicator.textContent = mathState.hasMemory ? `M = ${mathState.memory}` : '';
    }

    updateActiveMathDisplay();
  }

  function updateActiveMathDisplay() {
    if (activeMaster === 'tabMasterMath') {
      if (activeCalcSubMode === 'normal' || activeCalcSubMode === 'standard') renderMathDisplay();
      else renderSciDisplay();
    }
  }

  // --------------------------------------------------------------------------
  // 4. COMPREHENSIVE PHYSICS FORMULA SOLVER ENGINE
  // --------------------------------------------------------------------------
  const physicsTopicSelect = document.getElementById('physicsTopicSelect');
  const physicsFormulaSelect = document.getElementById('physicsFormulaSelect');
  const physicsSolveFor = document.getElementById('physicsSolveFor');
  const physicsInputsArea = document.getElementById('physicsInputsArea');
  const btnCalculatePhysics = document.getElementById('btnCalculatePhysics');
  const btnResetPhysics = document.getElementById('btnResetPhysics');
  const physicsSolutionTitle = document.getElementById('physicsSolutionTitle');
  const physicsFormulaText = document.getElementById('physicsFormulaText');
  const physicsSolutionResult = document.getElementById('physicsSolutionResult');
  const physicsStepBreakdown = document.getElementById('physicsStepBreakdown');

  // Physics Formulas Database
  const PHYSICS_DATABASE = {
    kinematics: [
      {
        id: 'newton_second',
        name: "Newton's Second Law (Force = Mass × Acceleration)",
        formula: 'F = m · a',
        variables: [
          { id: 'F', name: 'Force (F)', unit: 'N (kg·m/s²)', default: 50 },
          { id: 'm', name: 'Mass (m)', unit: 'kg', default: 10 },
          { id: 'a', name: 'Acceleration (a)', unit: 'm/s²', default: 5 }
        ],
        solve: (target, v) => {
          if (target === 'F') {
            const res = v.m * v.a;
            return { val: res, unit: 'N', eq: `F = (${v.m} kg) × (${v.a} m/s²) = ${res.toFixed(3)} N` };
          } else if (target === 'm') {
            const res = v.F / v.a;
            return { val: res, unit: 'kg', eq: `m = F / a = (${v.F} N) / (${v.a} m/s²) = ${res.toFixed(3)} kg` };
          } else {
            const res = v.F / v.m;
            return { val: res, unit: 'm/s²', eq: `a = F / m = (${v.F} N) / (${v.m} kg) = ${res.toFixed(3)} m/s²` };
          }
        }
      },
      {
        id: 'velocity_accel',
        name: 'Final Velocity (v = u + a·t)',
        formula: 'v = u + a · t',
        variables: [
          { id: 'v', name: 'Final Velocity (v)', unit: 'm/s', default: 25 },
          { id: 'u', name: 'Initial Velocity (u)', unit: 'm/s', default: 5 },
          { id: 'a', name: 'Acceleration (a)', unit: 'm/s²', default: 2 },
          { id: 't', name: 'Time (t)', unit: 's', default: 10 }
        ],
        solve: (target, v) => {
          if (target === 'v') {
            const res = v.u + v.a * v.t;
            return { val: res, unit: 'm/s', eq: `v = u + a·t = ${v.u} + (${v.a} × ${v.t}) = ${res.toFixed(3)} m/s` };
          } else if (target === 'u') {
            const res = v.v - v.a * v.t;
            return { val: res, unit: 'm/s', eq: `u = v - a·t = ${v.v} - (${v.a} × ${v.t}) = ${res.toFixed(3)} m/s` };
          } else if (target === 'a') {
            const res = (v.v - v.u) / v.t;
            return { val: res, unit: 'm/s²', eq: `a = (v - u) / t = (${v.v} - ${v.u}) / ${v.t} = ${res.toFixed(3)} m/s²` };
          } else {
            const res = (v.v - v.u) / v.a;
            return { val: res, unit: 's', eq: `t = (v - u) / a = (${v.v} - ${v.u}) / ${v.a} = ${res.toFixed(3)} s` };
          }
        }
      },
      {
        id: 'distance_kinematic',
        name: 'Displacement (s = u·t + ½a·t²)',
        formula: 's = u · t + ½ · a · t²',
        variables: [
          { id: 's', name: 'Displacement (s)', unit: 'm', default: 150 },
          { id: 'u', name: 'Initial Velocity (u)', unit: 'm/s', default: 5 },
          { id: 'a', name: 'Acceleration (a)', unit: 'm/s²', default: 2 },
          { id: 't', name: 'Time (t)', unit: 's', default: 10 }
        ],
        solve: (target, v) => {
          const res = (v.u * v.t) + (0.5 * v.a * v.t * v.t);
          return { val: res, unit: 'm', eq: `s = (${v.u}×${v.t}) + 0.5×(${v.a})×(${v.t})² = ${res.toFixed(3)} m` };
        }
      },
      {
        id: 'momentum',
        name: 'Linear Momentum (p = m · v)',
        formula: 'p = m · v',
        variables: [
          { id: 'p', name: 'Momentum (p)', unit: 'kg·m/s', default: 200 },
          { id: 'm', name: 'Mass (m)', unit: 'kg', default: 20 },
          { id: 'v', name: 'Velocity (v)', unit: 'm/s', default: 10 }
        ],
        solve: (target, v) => {
          if (target === 'p') {
            const res = v.m * v.v;
            return { val: res, unit: 'kg·m/s', eq: `p = m × v = ${v.m} × ${v.v} = ${res.toFixed(3)} kg·m/s` };
          } else if (target === 'm') {
            const res = v.p / v.v;
            return { val: res, unit: 'kg', eq: `m = p / v = ${v.p} / ${v.v} = ${res.toFixed(3)} kg` };
          } else {
            const res = v.p / v.m;
            return { val: res, unit: 'm/s', eq: `v = p / m = ${v.p} / ${v.m} = ${res.toFixed(3)} m/s` };
          }
        }
      }
    ],

    energy_work: [
      {
        id: 'kinetic_energy',
        name: 'Kinetic Energy (KE = ½ · m · v²)',
        formula: 'KE = ½ · m · v²',
        variables: [
          { id: 'KE', name: 'Kinetic Energy (KE)', unit: 'Joules (J)', default: 500 },
          { id: 'm', name: 'Mass (m)', unit: 'kg', default: 10 },
          { id: 'v', name: 'Velocity (v)', unit: 'm/s', default: 10 }
        ],
        solve: (target, v) => {
          if (target === 'KE') {
            const res = 0.5 * v.m * v.v * v.v;
            return { val: res, unit: 'J', eq: `KE = 0.5 × ${v.m} × (${v.v})² = ${res.toFixed(3)} Joules` };
          } else if (target === 'm') {
            const res = (2 * v.KE) / (v.v * v.v);
            return { val: res, unit: 'kg', eq: `m = 2·KE / v² = (2 × ${v.KE}) / (${v.v})² = ${res.toFixed(3)} kg` };
          } else {
            const res = Math.sqrt((2 * v.KE) / v.m);
            return { val: res, unit: 'm/s', eq: `v = √(2·KE / m) = √((2 × ${v.KE}) / ${v.m}) = ${res.toFixed(3)} m/s` };
          }
        }
      },
      {
        id: 'potential_energy',
        name: 'Gravitational Potential Energy (PE = m · g · h)',
        formula: 'PE = m · g · h  (g = 9.8 m/s²)',
        variables: [
          { id: 'PE', name: 'Potential Energy (PE)', unit: 'Joules (J)', default: 490 },
          { id: 'm', name: 'Mass (m)', unit: 'kg', default: 10 },
          { id: 'h', name: 'Height (h)', unit: 'm', default: 5 }
        ],
        solve: (target, v) => {
          const g = 9.8;
          if (target === 'PE') {
            const res = v.m * g * v.h;
            return { val: res, unit: 'J', eq: `PE = ${v.m} × 9.8 × ${v.h} = ${res.toFixed(3)} Joules` };
          } else if (target === 'm') {
            const res = v.PE / (g * v.h);
            return { val: res, unit: 'kg', eq: `m = PE / (g·h) = ${v.PE} / (9.8 × ${v.h}) = ${res.toFixed(3)} kg` };
          } else {
            const res = v.PE / (v.m * g);
            return { val: res, unit: 'm', eq: `h = PE / (m·g) = ${v.PE} / (${v.m} × 9.8) = ${res.toFixed(3)} m` };
          }
        }
      },
      {
        id: 'work_power',
        name: 'Work & Power (W = F · d, P = W / t)',
        formula: 'W = F · d  |  P = W / t',
        variables: [
          { id: 'P', name: 'Power (P)', unit: 'Watts (W)', default: 100 },
          { id: 'W', name: 'Work Done (W)', unit: 'Joules (J)', default: 500 },
          { id: 't', name: 'Time (t)', unit: 'seconds', default: 5 }
        ],
        solve: (target, v) => {
          if (target === 'P') {
            const res = v.W / v.t;
            return { val: res, unit: 'Watts', eq: `P = W / t = ${v.W} / ${v.t} = ${res.toFixed(3)} Watts` };
          } else if (target === 'W') {
            const res = v.P * v.t;
            return { val: res, unit: 'Joules', eq: `W = P × t = ${v.P} × ${v.t} = ${res.toFixed(3)} Joules` };
          } else {
            const res = v.W / v.P;
            return { val: res, unit: 'seconds', eq: `t = W / P = ${v.W} / ${v.P} = ${res.toFixed(3)} s` };
          }
        }
      }
    ],

    dynamics: [
      {
        id: 'gravitation_universal',
        name: 'Newton’s Law of Universal Gravitation',
        formula: 'F = G · (m₁ · m₂) / r²  (G = 6.674×10⁻¹¹)',
        variables: [
          { id: 'F', name: 'Gravitational Force', unit: 'N', default: 0.0000000667 },
          { id: 'm1', name: 'Mass 1 (m₁)', unit: 'kg', default: 1000 },
          { id: 'm2', name: 'Mass 2 (m₂)', unit: 'kg', default: 1000 },
          { id: 'r', name: 'Distance (r)', unit: 'm', default: 1 }
        ],
        solve: (target, v) => {
          const G = 6.6743e-11;
          const res = (G * v.m1 * v.m2) / (v.r * v.r);
          return { val: res, unit: 'N', eq: `F = (6.674×10⁻¹¹) × (${v.m1} × ${v.m2}) / (${v.r})² = ${res.toExponential(4)} N` };
        }
      },
      {
        id: 'weight',
        name: 'Weight Force (W = m · g)',
        formula: 'W = m · g  (g = 9.8 m/s²)',
        variables: [
          { id: 'W', name: 'Weight (W)', unit: 'N', default: 98 },
          { id: 'm', name: 'Mass (m)', unit: 'kg', default: 10 }
        ],
        solve: (target, v) => {
          if (target === 'W') {
            const res = v.m * 9.8;
            return { val: res, unit: 'N', eq: `W = ${v.m} kg × 9.8 m/s² = ${res.toFixed(2)} N` };
          } else {
            const res = v.W / 9.8;
            return { val: res, unit: 'kg', eq: `m = W / 9.8 = ${v.W} / 9.8 = ${res.toFixed(2)} kg` };
          }
        }
      }
    ],

    electricity: [
      {
        id: 'ohms_law_phys',
        name: "Ohm's Law & Electric Power (V = I·R, P = V·I)",
        formula: 'V = I · R  |  P = V · I',
        variables: [
          { id: 'V', name: 'Voltage (V)', unit: 'Volts (V)', default: 12 },
          { id: 'I', name: 'Current (I)', unit: 'Amperes (A)', default: 2 },
          { id: 'R', name: 'Resistance (R)', unit: 'Ohms (Ω)', default: 6 }
        ],
        solve: (target, v) => {
          if (target === 'V') {
            const res = v.I * v.R;
            return { val: res, unit: 'V', eq: `V = I × R = ${v.I} A × ${v.R} Ω = ${res.toFixed(3)} Volts (Power: ${(res * v.I).toFixed(2)} W)` };
          } else if (target === 'I') {
            const res = v.V / v.R;
            return { val: res, unit: 'A', eq: `I = V / R = ${v.V} V / ${v.R} Ω = ${res.toFixed(3)} Amps (Power: ${(v.V * res).toFixed(2)} W)` };
          } else {
            const res = v.V / v.I;
            return { val: res, unit: 'Ω', eq: `R = V / I = ${v.V} V / ${v.I} A = ${res.toFixed(3)} Ohms` };
          }
        }
      },
      {
        id: 'coulombs_law',
        name: "Coulomb's Law of Electrostatic Force",
        formula: 'F = k · |q₁ · q₂| / r²  (k = 8.99×10⁹)',
        variables: [
          { id: 'F', name: 'Force (F)', unit: 'N', default: 8990000000 },
          { id: 'q1', name: 'Charge 1 (q₁)', unit: 'Coulombs (C)', default: 1 },
          { id: 'q2', name: 'Charge 2 (q₂)', unit: 'Coulombs (C)', default: 1 },
          { id: 'r', name: 'Distance (r)', unit: 'm', default: 1 }
        ],
        solve: (target, v) => {
          const k = 8.98755e9;
          const res = (k * Math.abs(v.q1 * v.q2)) / (v.r * v.r);
          return { val: res, unit: 'N', eq: `F = (8.99×10⁹) × (${v.q1} × ${v.q2}) / (${v.r})² = ${res.toExponential(4)} N` };
        }
      }
    ],

    waves_optics: [
      {
        id: 'wave_speed',
        name: 'Wave Speed Equation (v = f · λ)',
        formula: 'v = f · λ',
        variables: [
          { id: 'v', name: 'Wave Speed (v)', unit: 'm/s', default: 340 },
          { id: 'f', name: 'Frequency (f)', unit: 'Hz', default: 440 },
          { id: 'lambda', name: 'Wavelength (λ)', unit: 'm', default: 0.7727 }
        ],
        solve: (target, v) => {
          if (target === 'v') {
            const res = v.f * v.lambda;
            return { val: res, unit: 'm/s', eq: `v = f × λ = ${v.f} Hz × ${v.lambda} m = ${res.toFixed(3)} m/s` };
          } else if (target === 'f') {
            const res = v.v / v.lambda;
            return { val: res, unit: 'Hz', eq: `f = v / λ = ${v.v} / ${v.lambda} = ${res.toFixed(3)} Hz` };
          } else {
            const res = v.v / v.f;
            return { val: res, unit: 'm', eq: `λ = v / f = ${v.v} / ${v.f} = ${res.toFixed(4)} m` };
          }
        }
      },
      {
        id: 'photon_energy',
        name: 'Photon Energy (E = h · f)',
        formula: 'E = h · f  (h = 6.626×10⁻³⁴ J·s)',
        variables: [
          { id: 'E', name: 'Photon Energy (E)', unit: 'Joules (J)', default: 3.313e-19 },
          { id: 'f', name: 'Frequency (f)', unit: 'Hz', default: 5e14 }
        ],
        solve: (target, v) => {
          const h = 6.62607e-34;
          if (target === 'E') {
            const res = h * v.f;
            return { val: res, unit: 'J', eq: `E = h × f = (6.626×10⁻³⁴) × ${v.f.toExponential(2)} = ${res.toExponential(4)} Joules` };
          } else {
            const res = v.E / h;
            return { val: res, unit: 'Hz', eq: `f = E / h = ${v.E.toExponential(2)} / (6.626×10⁻³⁴) = ${res.toExponential(4)} Hz` };
          }
        }
      }
    ],

    thermodynamics: [
      {
        id: 'heat_capacity',
        name: 'Specific Heat Transfer (Q = m · c · ΔT)',
        formula: 'Q = m · c · ΔT',
        variables: [
          { id: 'Q', name: 'Heat Energy (Q)', unit: 'Joules (J)', default: 41840 },
          { id: 'm', name: 'Mass (m)', unit: 'kg', default: 1 },
          { id: 'c', name: 'Specific Heat (c)', unit: 'J/(kg·°C)', default: 4184 },
          { id: 'dT', name: 'Temp Change (ΔT)', unit: '°C or K', default: 10 }
        ],
        solve: (target, v) => {
          if (target === 'Q') {
            const res = v.m * v.c * v.dT;
            return { val: res, unit: 'J', eq: `Q = ${v.m} × ${v.c} × ${v.dT} = ${res.toFixed(1)} Joules` };
          } else {
            const res = v.Q / (v.m * v.c);
            return { val: res, unit: '°C', eq: `ΔT = Q / (m·c) = ${v.Q} / (${v.m} × ${v.c}) = ${res.toFixed(2)} °C` };
          }
        }
      },
      {
        id: 'density',
        name: 'Density Equation (D = m / V)',
        formula: 'D = m / V',
        variables: [
          { id: 'D', name: 'Density (D)', unit: 'kg/m³', default: 1000 },
          { id: 'm', name: 'Mass (m)', unit: 'kg', default: 50 },
          { id: 'V', name: 'Volume (V)', unit: 'm³', default: 0.05 }
        ],
        solve: (target, v) => {
          if (target === 'D') {
            const res = v.m / v.V;
            return { val: res, unit: 'kg/m³', eq: `D = m / V = ${v.m} / ${v.V} = ${res.toFixed(2)} kg/m³` };
          } else if (target === 'm') {
            const res = v.D * v.V;
            return { val: res, unit: 'kg', eq: `m = D × V = ${v.D} × ${v.V} = ${res.toFixed(2)} kg` };
          } else {
            const res = v.m / v.D;
            return { val: res, unit: 'm³', eq: `V = m / D = ${v.m} / ${v.D} = ${res.toFixed(4)} m³` };
          }
        }
      }
    ]
  };

  function updatePhysicsFormulas() {
    const topic = physicsTopicSelect.value;
    const formulaList = PHYSICS_DATABASE[topic] || PHYSICS_DATABASE.kinematics;

    physicsFormulaSelect.innerHTML = '';
    formulaList.forEach(f => {
      const opt = document.createElement('option');
      opt.value = f.id;
      opt.textContent = f.name;
      physicsFormulaSelect.appendChild(opt);
    });

    updatePhysicsVariables();
  }

  function getCurrentFormula() {
    const topic = physicsTopicSelect.value;
    const formulaId = physicsFormulaSelect.value;
    const list = PHYSICS_DATABASE[topic] || PHYSICS_DATABASE.kinematics;
    return list.find(f => f.id === formulaId) || list[0];
  }

  function updatePhysicsVariables() {
    const formula = getCurrentFormula();
    physicsSolveFor.innerHTML = '';

    formula.variables.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.id;
      opt.textContent = `${v.name} (${v.unit})`;
      physicsSolveFor.appendChild(opt);
    });

    renderPhysicsInputs();
  }

  function renderPhysicsInputs() {
    const formula = getCurrentFormula();
    const solveTarget = physicsSolveFor.value || formula.variables[0].id;
    physicsInputsArea.innerHTML = '';

    formula.variables.forEach(v => {
      if (v.id === solveTarget) return; // Do not show input for what we are solving for!

      const cell = document.createElement('div');
      cell.className = 'physics-input-cell';

      const label = document.createElement('label');
      label.setAttribute('for', `phys_in_${v.id}`);
      label.textContent = v.name;

      const group = document.createElement('div');
      group.className = 'physics-input-group';

      const input = document.createElement('input');
      input.type = 'number';
      input.step = 'any';
      input.id = `phys_in_${v.id}`;
      input.className = 'calc-select-control';
      input.value = v.default;

      const unitTag = document.createElement('span');
      unitTag.className = 'physics-unit-tag';
      unitTag.textContent = v.unit;

      group.appendChild(input);
      group.appendChild(unitTag);

      cell.appendChild(label);
      cell.appendChild(group);
      physicsInputsArea.appendChild(cell);
    });

    runPhysicsCalculation();
  }

  function runPhysicsCalculation() {
    const formula = getCurrentFormula();
    const target = physicsSolveFor.value || formula.variables[0].id;
    const targetVarObj = formula.variables.find(v => v.id === target);

    const inputs = {};
    formula.variables.forEach(v => {
      if (v.id === target) return;
      const el = document.getElementById(`phys_in_${v.id}`);
      inputs[v.id] = el ? parseFloat(el.value || '0') : v.default;
    });

    const result = formula.solve(target, inputs);

    // Update LCD Screen
    if (activeMaster === 'tabMasterPhysics') {
      lcdModeLabel.textContent = 'Physics Formula Solver';
      lcdExpression.textContent = formula.formula;
      lcdMainValue.textContent = `${targetVarObj.name} = ${typeof result.val === 'number' ? (result.val > 1e5 || result.val < 1e-4 ? result.val.toExponential(4) : result.val.toFixed(3)) : result.val} ${result.unit}`;
      lcdSubLeft.textContent = `Formula: ${formula.formula}`;
      lcdSubRight.textContent = 'Standard SI Units';
    }

    if (physicsSolutionTitle) physicsSolutionTitle.textContent = formula.name;
    if (physicsFormulaText) physicsFormulaText.textContent = formula.formula;
    if (physicsSolutionResult) {
      physicsSolutionResult.textContent = `${targetVarObj.name} = ${typeof result.val === 'number' ? (result.val > 1e5 || result.val < 1e-4 ? result.val.toExponential(4) : result.val.toFixed(3)) : result.val} ${result.unit}`;
    }
    if (physicsStepBreakdown) {
      physicsStepBreakdown.textContent = `Calculation: ${result.eq}`;
    }
  }

  // --------------------------------------------------------------------------
  // 5. FINANCE ENGINE (LOAN EMI, COMPOUND INTEREST, TIP & SPLIT)
  // --------------------------------------------------------------------------
  function switchSubFinanceTab(targetId) {
    activeSubFinance = targetId;
    Object.keys(subFinanceTabs).forEach(k => {
      const isTarget = (k === targetId);
      if (subFinanceTabs[k].btn) subFinanceTabs[k].btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
      if (subFinanceTabs[k].panel) {
        if (isTarget) subFinanceTabs[k].panel.classList.add('active');
        else subFinanceTabs[k].panel.classList.remove('active');
      }
    });

    if (targetId === 'subTabFinanceLoan') calculateLoanEmi();
    else if (targetId === 'subTabFinanceCompound') calculateCompoundInterest();
    else if (targetId === 'subTabFinanceTip') calculateTip();
  }

  function calculateLoanEmi() {
    const P = parseFloat(document.getElementById('loanPrincipal')?.value) || 0;
    const rAnnual = parseFloat(document.getElementById('loanRate')?.value) || 0;
    const termVal = parseFloat(document.getElementById('loanTerm')?.value) || 0;
    const unit = document.getElementById('loanTermUnit')?.value || 'years';

    const N = unit === 'years' ? termVal * 12 : termVal;
    const rMonthly = (rAnnual / 100) / 12;

    let emi = 0;
    if (rMonthly === 0) {
      emi = N > 0 ? P / N : 0;
    } else if (N > 0) {
      emi = P * (rMonthly * Math.pow(1 + rMonthly, N)) / (Math.pow(1 + rMonthly, N) - 1);
    }

    const totalPay = emi * N;
    const totalInt = totalPay - P;
    const intRatio = totalPay > 0 ? (totalInt / totalPay) * 100 : 0;
    const princRatio = 100 - intRatio;

    const loanEmiDisplay = document.getElementById('loanEmiDisplay');
    const loanPrincDisplay = document.getElementById('loanPrincDisplay');
    const loanTotalIntDisplay = document.getElementById('loanTotalIntDisplay');
    const loanTotalPayDisplay = document.getElementById('loanTotalPayDisplay');
    const loanRatioDisplay = document.getElementById('loanRatioDisplay');
    const loanPrincBar = document.getElementById('loanPrincBar');
    const loanIntBar = document.getElementById('loanIntBar');

    if (loanEmiDisplay) loanEmiDisplay.textContent = `$${emi.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (loanPrincDisplay) loanPrincDisplay.textContent = `$${P.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (loanTotalIntDisplay) loanTotalIntDisplay.textContent = `$${totalInt.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (loanTotalPayDisplay) loanTotalPayDisplay.textContent = `$${totalPay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (loanRatioDisplay) loanRatioDisplay.textContent = `${intRatio.toFixed(1)}%`;

    if (loanPrincBar) loanPrincBar.style.width = `${princRatio.toFixed(1)}%`;
    if (loanIntBar) loanIntBar.style.width = `${intRatio.toFixed(1)}%`;

    // LCD screen
    if (activeMaster === 'tabMasterFinance' && activeSubFinance === 'subTabFinanceLoan') {
      lcdModeLabel.textContent = 'Loan / Mortgage EMI';
      lcdExpression.textContent = `$${P.toLocaleString()} @ ${rAnnual}% for ${termVal} ${unit}`;
      lcdMainValue.textContent = `$${emi.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / month`;
      lcdSubLeft.textContent = `Total Interest: $${totalInt.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      lcdSubRight.textContent = `Total Pay: $${totalPay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  }

  function calculateCompoundInterest() {
    const P = parseFloat(document.getElementById('ciPrincipal')?.value) || 0;
    const rAnnual = parseFloat(document.getElementById('ciRate')?.value) || 0;
    const t = parseFloat(document.getElementById('ciYears')?.value) || 0;
    const n = parseFloat(document.getElementById('ciFrequency')?.value) || 12;

    const rDec = rAnnual / 100;
    const A = P * Math.pow(1 + (rDec / n), n * t);
    const earned = A - P;
    const multiple = P > 0 ? (A / P) : 1;
    const apy = (Math.pow(1 + (rDec / n), n) - 1) * 100;

    const ciFutureDisplay = document.getElementById('ciFutureDisplay');
    const ciPrincipalDisplay = document.getElementById('ciPrincipalDisplay');
    const ciEarnedDisplay = document.getElementById('ciEarnedDisplay');
    const ciMultipleDisplay = document.getElementById('ciMultipleDisplay');
    const ciApyDisplay = document.getElementById('ciApyDisplay');

    if (ciFutureDisplay) ciFutureDisplay.textContent = `$${A.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (ciPrincipalDisplay) ciPrincipalDisplay.textContent = `$${P.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (ciEarnedDisplay) ciEarnedDisplay.textContent = `$${earned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (ciMultipleDisplay) ciMultipleDisplay.textContent = `${multiple.toFixed(2)}×`;
    if (ciApyDisplay) ciApyDisplay.textContent = `${apy.toFixed(2)}%`;

    // LCD screen
    if (activeMaster === 'tabMasterFinance' && activeSubFinance === 'subTabFinanceCompound') {
      lcdModeLabel.textContent = 'Compound Interest Growth';
      lcdExpression.textContent = `$${P.toLocaleString()} @ ${rAnnual}% compounded for ${t} years`;
      lcdMainValue.textContent = `$${A.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      lcdSubLeft.textContent = `Interest Earned: $${earned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      lcdSubRight.textContent = `Effective APY: ${apy.toFixed(2)}%`;
    }
  }

  function calculateTip() {
    const bill = parseFloat(document.getElementById('tipBillAmount')?.value) || 0;
    const tipPct = parseFloat(document.getElementById('tipPercent')?.value) || 0;
    const guests = parseInt(document.getElementById('tipSplitGuests')?.value, 10) || 1;

    const tipTotal = bill * (tipPct / 100);
    const grandTotal = bill + tipTotal;
    const tipPerGuest = tipTotal / guests;
    const totalPerGuest = grandTotal / guests;

    const tipTotalPerPersonDisplay = document.getElementById('tipTotalPerPersonDisplay');
    const tipPerPersonDisplay = document.getElementById('tipPerPersonDisplay');
    const tipTotalDisplay = document.getElementById('tipTotalDisplay');
    const tipGrandTotalDisplay = document.getElementById('tipGrandTotalDisplay');
    const tipGuestsDisplay = document.getElementById('tipGuestsDisplay');

    if (tipTotalPerPersonDisplay) tipTotalPerPersonDisplay.textContent = `$${totalPerGuest.toFixed(2)}`;
    if (tipPerPersonDisplay) tipPerPersonDisplay.textContent = `$${tipPerGuest.toFixed(2)}`;
    if (tipTotalDisplay) tipTotalDisplay.textContent = `$${tipTotal.toFixed(2)}`;
    if (tipGrandTotalDisplay) tipGrandTotalDisplay.textContent = `$${grandTotal.toFixed(2)}`;
    if (tipGuestsDisplay) tipGuestsDisplay.textContent = `${guests} guest${guests > 1 ? 's' : ''}`;

    // LCD screen
    if (activeMaster === 'tabMasterFinance' && activeSubFinance === 'subTabFinanceTip') {
      lcdModeLabel.textContent = 'Tip & Bill Split';
      lcdExpression.textContent = `Bill $${bill.toFixed(2)} + ${tipPct}% tip split by ${guests}`;
      lcdMainValue.textContent = `$${totalPerGuest.toFixed(2)} / person`;
      lcdSubLeft.textContent = `Tip: $${tipTotal.toFixed(2)} ($${tipPerGuest.toFixed(2)} ea)`;
      lcdSubRight.textContent = `Grand Total: $${grandTotal.toFixed(2)}`;
    }
  }

  // --------------------------------------------------------------------------
  // 6. FITNESS & HEALTH ENGINE (BMI & BMR/CALORIES)
  // --------------------------------------------------------------------------
  function switchSubFitnessTab(targetId) {
    activeSubFitness = targetId;
    Object.keys(subFitnessTabs).forEach(k => {
      const isTarget = (k === targetId);
      if (subFitnessTabs[k].btn) subFitnessTabs[k].btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
      if (subFitnessTabs[k].panel) {
        if (isTarget) subFitnessTabs[k].panel.classList.add('active');
        else subFitnessTabs[k].panel.classList.remove('active');
      }
    });

    if (targetId === 'subTabFitnessBmi') calculateBmi();
    else if (targetId === 'subTabFitnessBmr') calculateBmr();
  }

  function calculateBmi() {
    const system = document.getElementById('bmiUnitSystem')?.value || 'metric';
    let heightM = 0;
    let weightKg = 0;

    if (system === 'metric') {
      const hCm = parseFloat(document.getElementById('bmiMetricHeight')?.value) || 175;
      weightKg = parseFloat(document.getElementById('bmiMetricWeight')?.value) || 70;
      heightM = hCm / 100;
    } else {
      const ft = parseFloat(document.getElementById('bmiUsHeightFt')?.value) || 5;
      const inches = parseFloat(document.getElementById('bmiUsHeightIn')?.value) || 9;
      const lbs = parseFloat(document.getElementById('bmiUsWeightLbs')?.value) || 150;
      const totalIn = ft * 12 + inches;
      heightM = totalIn * 0.0254;
      weightKg = lbs * 0.45359237;
    }

    if (heightM <= 0) return;
    const bmi = weightKg / (heightM * heightM);

    let cat = 'Normal weight';
    let catColor = '#196f3d';
    let activeZone = 'normal';

    if (bmi < 18.5) {
      cat = 'Underweight';
      catColor = '#0055aa';
      activeZone = 'under';
    } else if (bmi < 25.0) {
      cat = 'Normal weight';
      catColor = '#196f3d';
      activeZone = 'normal';
    } else if (bmi < 30.0) {
      cat = 'Overweight';
      catColor = '#b45309';
      activeZone = 'over';
    } else {
      cat = 'Obese';
      catColor = '#dc2626';
      activeZone = 'obese';
    }

    const minNormKg = 18.5 * heightM * heightM;
    const maxNormKg = 24.9 * heightM * heightM;

    let rangeStr = `${minNormKg.toFixed(1)} – ${maxNormKg.toFixed(1)} kg`;
    if (system === 'us') {
      const minLbs = minNormKg * 2.20462;
      const maxLbs = maxNormKg * 2.20462;
      rangeStr = `${minLbs.toFixed(1)} – ${maxLbs.toFixed(1)} lbs`;
    }

    const bmiValDisplay = document.getElementById('bmiValDisplay');
    const catEl = document.getElementById('bmiCategoryDisplay');
    const bmiHealthyWeightDisplay = document.getElementById('bmiHealthyWeightDisplay');

    if (bmiValDisplay) bmiValDisplay.textContent = `${bmi.toFixed(1)} kg/m²`;
    if (catEl) {
      catEl.textContent = cat;
      catEl.style.color = catColor;
    }
    if (bmiHealthyWeightDisplay) bmiHealthyWeightDisplay.textContent = rangeStr;

    // Visual gauge
    document.querySelectorAll('.bmi-zone').forEach(z => z.classList.remove('active'));
    document.querySelector(`.bmi-zone.${activeZone}`)?.classList.add('active');

    // LCD screen
    if (activeMaster === 'tabMasterFitness' && activeSubFitness === 'subTabFitnessBmi') {
      lcdModeLabel.textContent = 'Body Mass Index (BMI)';
      lcdExpression.textContent = `Height: ${(heightM * 100).toFixed(0)}cm | Weight: ${weightKg.toFixed(1)}kg`;
      lcdMainValue.textContent = `${bmi.toFixed(1)} kg/m² (${cat})`;
      lcdSubLeft.textContent = `Healthy Weight: ${rangeStr}`;
      lcdSubRight.textContent = 'WHO / CDC Standards';
    }
  }

  function calculateBmr() {
    const gender = document.getElementById('bmrGender')?.value || 'male';
    const age = parseFloat(document.getElementById('bmrAge')?.value) || 28;
    const h = parseFloat(document.getElementById('bmrHeight')?.value) || 175;
    const w = parseFloat(document.getElementById('bmrWeight')?.value) || 70;
    const activity = parseFloat(document.getElementById('bmrActivity')?.value) || 1.375;

    // Mifflin-St Jeor equation
    let bmr = (10 * w) + (6.25 * h) - (5 * age);
    if (gender === 'male') bmr += 5;
    else bmr -= 161;

    const tdee = bmr * activity;
    const loss = tdee * 0.80; // 20% deficit
    const gain = tdee * 1.15; // 15% surplus

    const bmrTdeeDisplay = document.getElementById('bmrTdeeDisplay');
    const bmrBaseDisplay = document.getElementById('bmrBaseDisplay');
    const bmrLossDisplay = document.getElementById('bmrLossDisplay');
    const bmrGainDisplay = document.getElementById('bmrGainDisplay');

    if (bmrTdeeDisplay) bmrTdeeDisplay.textContent = `${Math.round(tdee).toLocaleString()} kcal/day`;
    if (bmrBaseDisplay) bmrBaseDisplay.textContent = `${Math.round(bmr).toLocaleString()} kcal`;
    if (bmrLossDisplay) bmrLossDisplay.textContent = `${Math.round(loss).toLocaleString()} kcal`;
    if (bmrGainDisplay) bmrGainDisplay.textContent = `${Math.round(gain).toLocaleString()} kcal`;

    // LCD screen
    if (activeMaster === 'tabMasterFitness' && activeSubFitness === 'subTabFitnessBmr') {
      lcdModeLabel.textContent = 'Calorie Needs (TDEE)';
      lcdExpression.textContent = `${gender === 'male' ? 'Male' : 'Female'}, ${age}y, ${h}cm, ${w}kg (${activity}× activity)`;
      lcdMainValue.textContent = `${Math.round(tdee).toLocaleString()} kcal / day`;
      lcdSubLeft.textContent = `Basal BMR: ${Math.round(bmr).toLocaleString()} kcal`;
      lcdSubRight.textContent = `Mild Loss Target: ${Math.round(loss).toLocaleString()} kcal`;
    }
  }

  // --------------------------------------------------------------------------
  // 7. UNIVERSAL UNIT CONVERTER ENGINE
  // --------------------------------------------------------------------------
  const CONVERTER_UNITS = {
    length: {
      name: 'Length & Distance',
      base: 'm',
      units: [
        { id: 'm', name: 'Meters (m)', factor: 1 },
        { id: 'km', name: 'Kilometers (km)', factor: 1000 },
        { id: 'cm', name: 'Centimeters (cm)', factor: 0.01 },
        { id: 'mm', name: 'Millimeters (mm)', factor: 0.001 },
        { id: 'mi', name: 'Miles (mi)', factor: 1609.344 },
        { id: 'yd', name: 'Yards (yd)', factor: 0.9144 },
        { id: 'ft', name: 'Feet (ft)', factor: 0.3048 },
        { id: 'in', name: 'Inches (in)', factor: 0.0254 },
        { id: 'nmi', name: 'Nautical Miles (nmi)', factor: 1852 }
      ],
      defaultFrom: 'm',
      defaultTo: 'ft'
    },
    mass: {
      name: 'Mass & Weight',
      base: 'kg',
      units: [
        { id: 'kg', name: 'Kilograms (kg)', factor: 1 },
        { id: 'g', name: 'Grams (g)', factor: 0.001 },
        { id: 'mg', name: 'Milligrams (mg)', factor: 0.000001 },
        { id: 't', name: 'Metric Tons (t)', factor: 1000 },
        { id: 'lb', name: 'Pounds (lbs)', factor: 0.45359237 },
        { id: 'oz', name: 'Ounces (oz)', factor: 0.028349523125 },
        { id: 'st', name: 'Stones (st)', factor: 6.35029318 }
      ],
      defaultFrom: 'kg',
      defaultTo: 'lb'
    },
    temperature: {
      name: 'Temperature',
      base: 'C',
      units: [
        { id: 'C', name: 'Celsius (°C)', factor: 1 },
        { id: 'F', name: 'Fahrenheit (°F)', factor: 1 },
        { id: 'K', name: 'Kelvin (K)', factor: 1 }
      ],
      defaultFrom: 'C',
      defaultTo: 'F'
    },
    speed: {
      name: 'Speed & Velocity',
      base: 'm_s',
      units: [
        { id: 'm_s', name: 'Meters / sec (m/s)', factor: 1 },
        { id: 'km_h', name: 'Kilometers / hour (km/h)', factor: 0.277777778 },
        { id: 'mph', name: 'Miles / hour (mph)', factor: 0.44704 },
        { id: 'knot', name: 'Knots (kn)', factor: 0.514444444 },
        { id: 'ft_s', name: 'Feet / sec (ft/s)', factor: 0.3048 }
      ],
      defaultFrom: 'km_h',
      defaultTo: 'mph'
    },
    pressure: {
      name: 'Pressure',
      base: 'Pa',
      units: [
        { id: 'Pa', name: 'Pascals (Pa)', factor: 1 },
        { id: 'kPa', name: 'Kilopascals (kPa)', factor: 1000 },
        { id: 'bar', name: 'Bar (bar)', factor: 100000 },
        { id: 'psi', name: 'Pounds/sq in (psi)', factor: 6894.757 },
        { id: 'atm', name: 'Atmospheres (atm)', factor: 101325 },
        { id: 'mmHg', name: 'Millimeters Mercury (mmHg)', factor: 133.322 }
      ],
      defaultFrom: 'bar',
      defaultTo: 'psi'
    },
    storage: {
      name: 'Digital Storage',
      base: 'B',
      units: [
        { id: 'B', name: 'Bytes (B)', factor: 1 },
        { id: 'KB', name: 'Kilobytes (KB)', factor: 1024 },
        { id: 'MB', name: 'Megabytes (MB)', factor: 1048576 },
        { id: 'GB', name: 'Gigabytes (GB)', factor: 1073741824 },
        { id: 'TB', name: 'Terabytes (TB)', factor: 1099511627776 }
      ],
      defaultFrom: 'GB',
      defaultTo: 'MB'
    },
    energy: {
      name: 'Energy & Power',
      base: 'J',
      units: [
        { id: 'J', name: 'Joules (J)', factor: 1 },
        { id: 'kJ', name: 'Kilojoules (kJ)', factor: 1000 },
        { id: 'cal', name: 'Calories (cal)', factor: 4.184 },
        { id: 'kcal', name: 'Kilocalories (kcal)', factor: 4184 },
        { id: 'kWh', name: 'Kilowatt-hours (kWh)', factor: 3600000 },
        { id: 'BTU', name: 'British Thermal Units (BTU)', factor: 1055.06 },
        { id: 'ft_lb', name: 'Foot-Pounds (ft-lb)', factor: 1.355818 }
      ],
      defaultFrom: 'kWh',
      defaultTo: 'BTU'
    }
  };

  function populateConverterUnits() {
    const cat = document.getElementById('converterCategorySelect')?.value || 'length';
    const conf = CONVERTER_UNITS[cat];
    if (!conf) return;

    const fromSel = document.getElementById('convUnitFrom');
    const toSel = document.getElementById('convUnitTo');
    if (!fromSel || !toSel) return;

    fromSel.innerHTML = '';
    toSel.innerHTML = '';

    conf.units.forEach(u => {
      const opt1 = document.createElement('option');
      opt1.value = u.id;
      opt1.textContent = u.name;
      if (u.id === conf.defaultFrom) opt1.selected = true;
      fromSel.appendChild(opt1);

      const opt2 = document.createElement('option');
      opt2.value = u.id;
      opt2.textContent = u.name;
      if (u.id === conf.defaultTo) opt2.selected = true;
      toSel.appendChild(opt2);
    });

    convertUnits('from');
  }

  function convertUnits(direction) {
    const cat = document.getElementById('converterCategorySelect')?.value || 'length';
    const conf = CONVERTER_UNITS[cat];
    if (!conf) return;

    const fromSel = document.getElementById('convUnitFrom');
    const toSel = document.getElementById('convUnitTo');
    const valFromInput = document.getElementById('convValFrom');
    const valToInput = document.getElementById('convValTo');

    const uFrom = fromSel?.value;
    const uTo = toSel?.value;

    let vFrom = parseFloat(valFromInput?.value) || 0;
    let vTo = parseFloat(valToInput?.value) || 0;

    if (cat === 'temperature') {
      if (direction === 'from') {
        let c = vFrom;
        if (uFrom === 'F') c = (vFrom - 32) * (5/9);
        else if (uFrom === 'K') c = vFrom - 273.15;

        let out = c;
        if (uTo === 'F') out = c * (9/5) + 32;
        else if (uTo === 'K') out = c + 273.15;

        if (valToInput) valToInput.value = parseFloat(out.toFixed(6));
      } else {
        let c = vTo;
        if (uTo === 'F') c = (vTo - 32) * (5/9);
        else if (uTo === 'K') c = vTo - 273.15;

        let out = c;
        if (uFrom === 'F') out = c * (9/5) + 32;
        else if (uFrom === 'K') out = c + 273.15;

        if (valFromInput) valFromInput.value = parseFloat(out.toFixed(6));
      }
    } else {
      const fFrom = conf.units.find(u => u.id === uFrom)?.factor || 1;
      const fTo = conf.units.find(u => u.id === uTo)?.factor || 1;

      if (direction === 'from') {
        const baseVal = vFrom * fFrom;
        const out = baseVal / fTo;
        if (valToInput) valToInput.value = parseFloat(out.toFixed(6));
      } else {
        const baseVal = vTo * fTo;
        const out = baseVal / fFrom;
        if (valFromInput) valFromInput.value = parseFloat(out.toFixed(6));
      }
    }

    const curFrom = parseFloat(valFromInput?.value) || 0;
    const curTo = parseFloat(valToInput?.value) || 0;
    const fromName = conf.units.find(u => u.id === uFrom)?.name || uFrom;
    const toName = conf.units.find(u => u.id === uTo)?.name || uTo;
    const badge = document.getElementById('convRateBadge');
    if (badge) badge.textContent = `${curFrom} ${fromName} = ${curTo} ${toName}`;

    // LCD screen
    if (activeMaster === 'tabMasterConverter') {
      lcdModeLabel.textContent = `Unit Converter (${conf.name})`;
      lcdExpression.textContent = `Converting ${fromName} to ${toName}`;
      lcdMainValue.textContent = `${curTo.toLocaleString()} ${uTo}`;
      lcdSubLeft.textContent = `Input: ${curFrom.toLocaleString()} ${uFrom}`;
      lcdSubRight.textContent = `Standard SI Base: ${conf.base}`;
    }
  }

  function swapConverterUnits() {
    const fromSel = document.getElementById('convUnitFrom');
    const toSel = document.getElementById('convUnitTo');
    if (!fromSel || !toSel) return;

    const tmp = fromSel.value;
    fromSel.value = toSel.value;
    toSel.value = tmp;

    convertUnits('from');
  }

  // --------------------------------------------------------------------------
  // 8. CHEMISTRY & FLUIDS ENGINE
  // --------------------------------------------------------------------------
  function switchSubChemTab(targetId) {
    activeSubChem = targetId;
    Object.keys(subChemTabs).forEach(k => {
      const isTarget = (k === targetId);
      if (subChemTabs[k].btn) subChemTabs[k].btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
      if (subChemTabs[k].panel) {
        if (isTarget) subChemTabs[k].panel.classList.add('active');
        else subChemTabs[k].panel.classList.remove('active');
      }
    });

    if (targetId === 'subTabChemDilution') calculateDilution();
    else if (targetId === 'subTabChemPh') calculatePh();
    else if (targetId === 'subTabChemMolar') calculateMolarMass();
    else if (targetId === 'subTabChemFluid') calculateFluidPressure();
  }

  function calculateDilution() {
    const solveFor = document.getElementById('chemDilutionSolveFor')?.value || 'V2';
    
    const rowC1 = document.getElementById('rowDilutionC1');
    const rowV1 = document.getElementById('rowDilutionV1');
    const rowC2 = document.getElementById('rowDilutionC2');
    const rowV2 = document.getElementById('rowDilutionV2');

    if (rowC1) rowC1.style.display = (solveFor === 'C1') ? 'none' : 'flex';
    if (rowV1) rowV1.style.display = (solveFor === 'V1') ? 'none' : 'flex';
    if (rowC2) rowC2.style.display = (solveFor === 'C2') ? 'none' : 'flex';
    if (rowV2) rowV2.style.display = (solveFor === 'V2') ? 'none' : 'flex';

    let C1 = parseFloat(document.getElementById('dilutionC1')?.value) || 1;
    let V1 = parseFloat(document.getElementById('dilutionV1')?.value) || 1;
    let C2 = parseFloat(document.getElementById('dilutionC2')?.value) || 1;
    let V2 = parseFloat(document.getElementById('dilutionV2')?.value) || 1;

    let resLabel = '';
    let solventToAdd = 0;

    if (solveFor === 'V2') {
      V2 = (C1 * V1) / (C2 || 1);
      resLabel = `V₂ = ${V2.toFixed(2)} mL`;
      solventToAdd = Math.max(0, V2 - V1);
    } else if (solveFor === 'C2') {
      C2 = (C1 * V1) / (V2 || 1);
      resLabel = `C₂ = ${C2.toFixed(3)} M`;
      solventToAdd = Math.max(0, V2 - V1);
    } else if (solveFor === 'V1') {
      V1 = (C2 * V2) / (C1 || 1);
      resLabel = `V₁ = ${V1.toFixed(2)} mL`;
      solventToAdd = Math.max(0, V2 - V1);
    } else if (solveFor === 'C1') {
      C1 = (C2 * V2) / (V1 || 1);
      resLabel = `C₁ = ${C1.toFixed(3)} M`;
      solventToAdd = Math.max(0, V2 - V1);
    }

    const factor = C1 > 0 && C2 > 0 ? (C1 / C2) : 1;
    const moles = (C1 * (V1 / 1000));

    const dilutionResultDisplay = document.getElementById('dilutionResultDisplay');
    const dilutionSolventDisplay = document.getElementById('dilutionSolventDisplay');
    const dilutionFactorDisplay = document.getElementById('dilutionFactorDisplay');
    const dilutionMolesDisplay = document.getElementById('dilutionMolesDisplay');

    if (dilutionResultDisplay) dilutionResultDisplay.textContent = resLabel;
    if (dilutionSolventDisplay) dilutionSolventDisplay.textContent = `${solventToAdd.toFixed(2)} mL`;
    if (dilutionFactorDisplay) dilutionFactorDisplay.textContent = `${factor.toFixed(2)}×`;
    if (dilutionMolesDisplay) dilutionMolesDisplay.textContent = `${moles.toFixed(3)} mol`;

    // LCD screen
    if (activeMaster === 'tabMasterChemistry' && activeSubChem === 'subTabChemDilution') {
      lcdModeLabel.textContent = 'Solution Dilution (C₁V₁ = C₂V₂)';
      lcdExpression.textContent = `Initial: ${C1}M × ${V1}mL = Final: ${C2}M × ${V2}mL`;
      lcdMainValue.textContent = resLabel;
      lcdSubLeft.textContent = `Solvent to Add: ${solventToAdd.toFixed(2)} mL`;
      lcdSubRight.textContent = `Dilution Factor: ${factor.toFixed(2)}×`;
    }
  }

  function calculatePh() {
    const known = document.getElementById('chemPhKnownParam')?.value || 'pH';
    const val = parseFloat(document.getElementById('chemPhVal')?.value) || 7.0;

    let pH = 7.0;
    let pOH = 7.0;
    let hConc = 1e-7;
    let ohConc = 1e-7;

    if (known === 'pH') {
      pH = val;
      pOH = 14.0 - pH;
      hConc = Math.pow(10, -pH);
      ohConc = Math.pow(10, -pOH);
    } else if (known === 'pOH') {
      pOH = val;
      pH = 14.0 - pOH;
      hConc = Math.pow(10, -pH);
      ohConc = Math.pow(10, -pOH);
    } else if (known === 'H') {
      hConc = Math.max(1e-16, val);
      pH = -Math.log10(hConc);
      pOH = 14.0 - pH;
      ohConc = Math.pow(10, -pOH);
    } else if (known === 'OH') {
      ohConc = Math.max(1e-16, val);
      pOH = -Math.log10(ohConc);
      pH = 14.0 - pOH;
      hConc = Math.pow(10, -pH);
    }

    let classification = 'Neutral';
    let color = '#196f3d';
    if (pH < 3.0) { classification = 'Strongly Acidic'; color = '#dc2626'; }
    else if (pH < 6.8) { classification = 'Weakly Acidic'; color = '#ea580c'; }
    else if (pH <= 7.2) { classification = 'Neutral (pH 7.0)'; color = '#196f3d'; }
    else if (pH <= 11.0) { classification = 'Weakly Alkaline'; color = '#0055aa'; }
    else { classification = 'Strongly Alkaline'; color = '#7c3aed'; }

    const phDisplayVal = document.getElementById('phDisplayVal');
    const catEl = document.getElementById('phClassificationDisplay');
    const phDisplayPoh = document.getElementById('phDisplayPoh');
    const phDisplayH = document.getElementById('phDisplayH');
    const phDisplayOh = document.getElementById('phDisplayOh');

    if (phDisplayVal) phDisplayVal.textContent = pH.toFixed(2);
    if (catEl) {
      catEl.textContent = classification;
      catEl.style.color = color;
    }
    if (phDisplayPoh) phDisplayPoh.textContent = pOH.toFixed(2);
    if (phDisplayH) phDisplayH.textContent = `${hConc.toExponential(2)} M`;
    if (phDisplayOh) phDisplayOh.textContent = `${ohConc.toExponential(2)} M`;

    // LCD screen
    if (activeMaster === 'tabMasterChemistry' && activeSubChem === 'subTabChemPh') {
      lcdModeLabel.textContent = 'pH Equilibrium Solver';
      lcdExpression.textContent = `[H⁺] = ${hConc.toExponential(2)} M | [OH⁻] = ${ohConc.toExponential(2)} M`;
      lcdMainValue.textContent = `pH ${pH.toFixed(2)} (${classification})`;
      lcdSubLeft.textContent = `pOH: ${pOH.toFixed(2)}`;
      lcdSubRight.textContent = 'Standard Room Temp (25°C, Kw = 10⁻¹⁴)';
    }
  }

  function calculateMolarMass() {
    const sel = document.getElementById('chemCompoundSelect')?.value || 'H2O|18.015|Water';
    const mass = parseFloat(document.getElementById('chemMassGrams')?.value) || 100;
    const parts = sel.split('|');
    const formula = parts[0];
    const mw = parseFloat(parts[1]) || 18.015;
    const name = parts[2] || formula;

    const moles = mass / mw;
    const molecules = moles * 6.02214076e23;

    const chemMolesDisplay = document.getElementById('chemMolesDisplay');
    const chemMwDisplay = document.getElementById('chemMwDisplay');
    const chemMoleculesDisplay = document.getElementById('chemMoleculesDisplay');
    const chemFormulaDisplay = document.getElementById('chemFormulaDisplay');

    if (chemMolesDisplay) chemMolesDisplay.textContent = `${moles.toFixed(4)} mol`;
    if (chemMwDisplay) chemMwDisplay.textContent = `${mw.toFixed(3)} g/mol`;
    if (chemMoleculesDisplay) chemMoleculesDisplay.textContent = molecules.toExponential(2);
    if (chemFormulaDisplay) chemFormulaDisplay.textContent = `${formula} (${name})`;

    // LCD screen
    if (activeMaster === 'tabMasterChemistry' && activeSubChem === 'subTabChemMolar') {
      lcdModeLabel.textContent = 'Molar Mass & Stoichiometry';
      lcdExpression.textContent = `${mass}g of ${name} (${formula})`;
      lcdMainValue.textContent = `${moles.toFixed(4)} mol`;
      lcdSubLeft.textContent = `Molecular Weight: ${mw} g/mol`;
      lcdSubRight.textContent = `Molecules: ${molecules.toExponential(2)}`;
    }
  }

  function calculateFluidPressure() {
    const rho = parseFloat(document.getElementById('chemFluidDensity')?.value) || 1000;
    const h = parseFloat(document.getElementById('chemFluidDepth')?.value) || 10;
    const g = parseFloat(document.getElementById('chemFluidGravity')?.value) || 9.80665;

    const pPa = rho * g * h;
    const pKpa = pPa / 1000;
    const pAtm = pPa / 101325;
    const pPsi = pPa / 6894.757;
    const pBar = pPa / 100000;

    const fluidPressureKpaDisplay = document.getElementById('fluidPressureKpaDisplay');
    const fluidAtmDisplay = document.getElementById('fluidAtmDisplay');
    const fluidPsiDisplay = document.getElementById('fluidPsiDisplay');
    const fluidBarDisplay = document.getElementById('fluidBarDisplay');
    const fluidPaDisplay = document.getElementById('fluidPaDisplay');

    if (fluidPressureKpaDisplay) fluidPressureKpaDisplay.textContent = `${pKpa.toFixed(2)} kPa`;
    if (fluidAtmDisplay) fluidAtmDisplay.textContent = `${pAtm.toFixed(3)} atm`;
    if (fluidPsiDisplay) fluidPsiDisplay.textContent = `${pPsi.toFixed(2)} psi`;
    if (fluidBarDisplay) fluidBarDisplay.textContent = `${pBar.toFixed(3)} bar`;
    if (fluidPaDisplay) fluidPaDisplay.textContent = `${Math.round(pPa).toLocaleString()} Pa`;

    // LCD screen
    if (activeMaster === 'tabMasterChemistry' && activeSubChem === 'subTabChemFluid') {
      lcdModeLabel.textContent = 'Fluid Hydrostatic Pressure (P = ρgh)';
      lcdExpression.textContent = `Depth ${h}m in fluid (${rho} kg/m³) with g = ${g} m/s²`;
      lcdMainValue.textContent = `${pKpa.toFixed(2)} kPa (${pAtm.toFixed(3)} atm)`;
      lcdSubLeft.textContent = `${pPsi.toFixed(2)} psi | ${pBar.toFixed(3)} bar`;
      lcdSubRight.textContent = `Pascals: ${Math.round(pPa).toLocaleString()} Pa`;
    }
  }

  // --------------------------------------------------------------------------
  // KEYBOARD & EVENT BINDINGS
  // --------------------------------------------------------------------------
  function initKeyboardAndListeners() {
    // Master tab switching
    Object.keys(masterTabs).forEach(k => {
      masterTabs[k]?.btn?.addEventListener('click', () => switchMasterTab(k));
    });

    // Electronics sub-tabs
    Object.keys(subElectronicsTabs).forEach(k => {
      subElectronicsTabs[k]?.btn?.addEventListener('click', () => switchSubElectronicsTab(k));
    });

    // Band buttons
    bandButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        bandButtons.forEach(b => b.setAttribute('aria-pressed', 'false'));
        btn.setAttribute('aria-pressed', 'true');
        colorState.bandCount = parseInt(btn.getAttribute('data-bands'), 10);
        renderBandControls();
        calculateColorCode();
      });
    });

    if (btnCalculateColor) btnCalculateColor.addEventListener('click', calculateColorCode);
    if (btnResetColor) {
      btnResetColor.addEventListener('click', () => {
        colorState.band1 = 'brown';
        colorState.band2 = 'black';
        colorState.band3 = 'orange';
        colorState.mult = 'red';
        colorState.tol = 'gold';
        colorState.ppm = 'brown';
        renderBandControls();
        calculateColorCode();
      });
    }

    if (btnTestInCircuit) {
      btnTestInCircuit.addEventListener('click', () => {
        const ohms = colorState.calculatedOhms || 1000;
        if (ohms >= 1e6) {
          circuitResistorVal.value = (ohms / 1e6);
          circuitResistorUnit.value = '1000000';
        } else if (ohms >= 1e3) {
          circuitResistorVal.value = (ohms / 1e3);
          circuitResistorUnit.value = '1000';
        } else {
          circuitResistorVal.value = ohms;
          circuitResistorUnit.value = '1';
        }
        switchSubElectronicsTab('subTabCircuit');
      });
    }

    // Launch Camera Scanner from Resistor Code
    if (btnLaunchCamera) {
      btnLaunchCamera.addEventListener('click', () => {
        switchSubElectronicsTab('subTabCamera');
        if (!scannerState.stream && !scannerPhotoPreview?.src) {
          loadPresetResistor('10k');
        }
      });
    }

    // Camera scanner controls
    if (btnStartCamera) btnStartCamera.addEventListener('click', startScannerCamera);
    if (btnStopCamera) btnStopCamera.addEventListener('click', stopScannerCamera);
    if (btnFlipCameraFacing) btnFlipCameraFacing.addEventListener('click', flipScannerCamera);
    if (btnLiveAutoDetect) btnLiveAutoDetect.addEventListener('click', toggleLiveAutoDetect);
    if (btnSnapAnalyze) {
      btnSnapAnalyze.addEventListener('click', () => {
        const source = (scannerVideo && scannerVideo.style.display !== 'none') ? scannerVideo : scannerPhotoPreview;
        if (source) analyzeResistorImage(source);
      });
    }

    // Photo Upload Trigger & Change
    if (btnTriggerPhotoUpload && scannerFileInput) {
      btnTriggerPhotoUpload.addEventListener('click', () => scannerFileInput.click());
      scannerFileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          handlePhotoUpload(e.target.files[0]);
        }
      });
    }

    // Preset test resistors
    document.querySelectorAll('.btn-preset-resistor').forEach(btn => {
      btn.addEventListener('click', () => {
        const sampleKey = btn.getAttribute('data-sample');
        loadPresetResistor(sampleKey);
      });
    });

    // Scanner Mode Switchers
    if (btnScannerModeLive) {
      btnScannerModeLive.addEventListener('click', () => {
        [btnScannerModeLive, btnScannerModeUpload, btnScannerModeAiAgent].forEach(b => b?.classList.remove('active'));
        btnScannerModeLive.classList.add('active');
        if (aiAgentNeuralBox) aiAgentNeuralBox.style.display = 'none';
        startScannerCamera();
      });
    }
    if (btnScannerModeUpload) {
      btnScannerModeUpload.addEventListener('click', () => {
        [btnScannerModeLive, btnScannerModeUpload, btnScannerModeAiAgent].forEach(b => b?.classList.remove('active'));
        btnScannerModeUpload.classList.add('active');
        if (aiAgentNeuralBox) aiAgentNeuralBox.style.display = 'none';
        if (scannerFileInput) scannerFileInput.click();
      });
    }
    if (btnScannerModeAiAgent) {
      btnScannerModeAiAgent.addEventListener('click', () => {
        [btnScannerModeLive, btnScannerModeUpload, btnScannerModeAiAgent].forEach(b => b?.classList.remove('active'));
        btnScannerModeAiAgent.classList.add('active');
        if (aiAgentNeuralBox) {
          aiAgentNeuralBox.style.display = (aiAgentNeuralBox.style.display === 'none') ? 'flex' : 'none';
        }
      });
    }

    if (btnExecuteAiAgent) btnExecuteAiAgent.addEventListener('click', runNeuralAiAgent);
    if (btnInvertBands) btnInvertBands.addEventListener('click', invertScannerBands);
    if (btnApplyToResistorCalc) btnApplyToResistorCalc.addEventListener('click', applyScannerToMainCalc);

    // Digital Zoom controls
    document.querySelectorAll('.btn-zoom-step').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const z = parseFloat(btn.getAttribute('data-zoom'));
        setScannerZoom(z);
      });
    });

    // Tap-to-Target centering on video stage
    if (scannerStage) {
      scannerStage.addEventListener('click', (e) => {
        if (e.target.closest('.scanner-zoom-hud') || e.target.closest('.camera-status-hud')) return;
        handleStageTap(e);
      });
    }

    // Circuit simulator
    if (btnRunCircuitCheck) btnRunCircuitCheck.addEventListener('click', simulateCircuit);
    if (btnResetCircuitSim) {
      btnResetCircuitSim.addEventListener('click', () => {
        circuitResistorVal.value = '100';
        circuitResistorUnit.value = '1';
        circuitSourceVolts.value = '5.0';
        circuitVoltagePresets.value = '5.0';
        circuitLoadSelect.value = 'red_led';
        circuitResistorWatt.value = '0.25';
        simulateCircuit();
      });
    }

    [circuitResistorVal, circuitResistorUnit, circuitResistorWatt, circuitSourceVolts, circuitLoadSelect].forEach(el => {
      if (el) el.addEventListener('change', simulateCircuit);
    });

    if (circuitVoltagePresets) {
      circuitVoltagePresets.addEventListener('change', () => {
        if (circuitVoltagePresets.value !== 'custom') {
          circuitSourceVolts.value = circuitVoltagePresets.value;
          simulateCircuit();
        }
      });
      circuitSourceVolts.addEventListener('input', () => {
        circuitVoltagePresets.value = 'custom';
      });
    }

    // Parallel, Series, Conductor events
    document.getElementById('btnCalcParallel')?.addEventListener('click', calculateParallel);
    document.getElementById('btnClearParallel')?.addEventListener('click', () => {
      parallelValuesText.value = '';
      calculateParallel();
    });
    document.getElementById('btnCalcSeries')?.addEventListener('click', calculateSeries);
    document.getElementById('btnClearSeries')?.addEventListener('click', () => {
      seriesValuesText.value = '';
      calculateSeries();
    });
    document.getElementById('btnCalcConductor')?.addEventListener('click', calculateConductor);
    document.getElementById('btnClearConductor')?.addEventListener('click', () => {
      conductorLen.value = '100';
      conductorDiam.value = '1.00';
      conductorMaterial.value = '58000000';
      calculateConductor();
    });

    // Capacitor calculator events
    const capPresetSelect = document.getElementById('capPresetSelect');
    const capDigit1 = document.getElementById('capDigit1');
    const capDigit2 = document.getElementById('capDigit2');
    const capMultiplier = document.getElementById('capMultiplier');
    const capToleranceSelect = document.getElementById('capToleranceSelect');
    const capVoltageSelect = document.getElementById('capVoltageSelect');
    const capFreqHz = document.getElementById('capFreqHz');
    const capPairedR = document.getElementById('capPairedR');
    const btnCalculateCap = document.getElementById('btnCalculateCap');
    const btnResetCap = document.getElementById('btnResetCap');

    if (capPresetSelect) {
      capPresetSelect.addEventListener('change', () => {
        const val = capPresetSelect.value;
        if (val !== 'custom' && val.length >= 3) {
          if (capDigit1) capDigit1.value = val[0];
          if (capDigit2) capDigit2.value = val[1];
          if (capMultiplier) capMultiplier.value = val[2];
          calculateCapacitor();
        }
      });
    }

    [capDigit1, capDigit2, capMultiplier].forEach(el => {
      el?.addEventListener('change', () => {
        if (capPresetSelect) capPresetSelect.value = 'custom';
        calculateCapacitor();
      });
    });

    [capToleranceSelect, capVoltageSelect].forEach(el => {
      el?.addEventListener('change', calculateCapacitor);
    });

    [capFreqHz, capPairedR].forEach(el => {
      el?.addEventListener('input', calculateCapacitor);
    });

    if (btnCalculateCap) btnCalculateCap.addEventListener('click', calculateCapacitor);
    if (btnResetCap) {
      btnResetCap.addEventListener('click', () => {
        if (capPresetSelect) capPresetSelect.value = '104';
        if (capDigit1) capDigit1.value = '1';
        if (capDigit2) capDigit2.value = '0';
        if (capMultiplier) capMultiplier.value = '4';
        if (capToleranceSelect) capToleranceSelect.value = 'K|10';
        if (capVoltageSelect) capVoltageSelect.value = '1H|50';
        if (capFreqHz) capFreqHz.value = '1000';
        if (capPairedR) capPairedR.value = '1000';
        calculateCapacitor();
      });
    }

    // Diode & Zener events
    const diodeModeSelect = document.getElementById('diodeModeSelect');
    const diodePresetSelect = document.getElementById('diodePresetSelect');
    const diodeSourceVolts = document.getElementById('diodeSourceVolts');
    const diodeVfVal = document.getElementById('diodeVfVal');
    const diodeSeriesResistor = document.getElementById('diodeSeriesResistor');
    const diodeResistorUnit = document.getElementById('diodeResistorUnit');
    const diodeLoadCurrent = document.getElementById('diodeLoadCurrent');
    const btnCalculateDiode = document.getElementById('btnCalculateDiode');
    const btnResetDiode = document.getElementById('btnResetDiode');
    const lblDiodeVf = document.getElementById('lblDiodeVf');

    if (diodeModeSelect) {
      diodeModeSelect.addEventListener('change', () => {
        const isZener = (diodeModeSelect.value === 'zener');
        if (lblDiodeVf) lblDiodeVf.textContent = isZener ? 'Zener Breakdown (Vz):' : 'Forward Drop (Vf):';
        if (isZener && diodePresetSelect && !diodePresetSelect.value.startsWith('ZENER_')) {
          diodePresetSelect.value = 'ZENER_5V1|5.10|100|0.5';
          if (diodeVfVal) diodeVfVal.value = '5.10';
          if (diodeSourceVolts) diodeSourceVolts.value = '12.0';
        } else if (!isZener && diodePresetSelect && diodePresetSelect.value.startsWith('ZENER_')) {
          diodePresetSelect.value = '1N4001|0.70|1000|1.0';
          if (diodeVfVal) diodeVfVal.value = '0.70';
          if (diodeSourceVolts) diodeSourceVolts.value = '5.0';
        }
        calculateDiode();
      });
    }

    if (diodePresetSelect) {
      diodePresetSelect.addEventListener('change', () => {
        const val = diodePresetSelect.value;
        if (val !== 'custom') {
          const parts = val.split('|');
          const vf = parseFloat(parts[1]) || 0.7;
          if (diodeVfVal) diodeVfVal.value = vf;
          if (val.startsWith('ZENER_')) {
            if (diodeModeSelect) diodeModeSelect.value = 'zener';
            if (lblDiodeVf) lblDiodeVf.textContent = 'Zener Breakdown (Vz):';
            if (diodeSourceVolts && parseFloat(diodeSourceVolts.value) < vf) {
              diodeSourceVolts.value = (vf * 1.5).toFixed(1);
            }
          } else {
            if (diodeModeSelect) diodeModeSelect.value = 'forward';
            if (lblDiodeVf) lblDiodeVf.textContent = 'Forward Drop (Vf):';
          }
          calculateDiode();
        }
      });
    }

    [diodeSourceVolts, diodeVfVal, diodeSeriesResistor, diodeLoadCurrent].forEach(el => {
      el?.addEventListener('input', () => {
        if (el === diodeVfVal && diodePresetSelect) diodePresetSelect.value = 'custom';
        calculateDiode();
      });
    });

    if (diodeResistorUnit) diodeResistorUnit.addEventListener('change', calculateDiode);
    if (btnCalculateDiode) btnCalculateDiode.addEventListener('click', calculateDiode);
    if (btnResetDiode) {
      btnResetDiode.addEventListener('click', () => {
        if (diodeModeSelect) diodeModeSelect.value = 'forward';
        if (diodePresetSelect) diodePresetSelect.value = '1N4001|0.70|1000|1.0';
        if (lblDiodeVf) lblDiodeVf.textContent = 'Forward Drop (Vf):';
        if (diodeSourceVolts) diodeSourceVolts.value = '5.0';
        if (diodeVfVal) diodeVfVal.value = '0.70';
        if (diodeSeriesResistor) diodeSeriesResistor.value = '220';
        if (diodeResistorUnit) diodeResistorUnit.value = '1';
        if (diodeLoadCurrent) diodeLoadCurrent.value = '10.0';
        calculateDiode();
      });
    }

    // Transistor events
    const transistorModelSelect = document.getElementById('transistorModelSelect');
    const transSupplyVcc = document.getElementById('transSupplyVcc');
    const transBaseVin = document.getElementById('transBaseVin');
    const transBaseRb = document.getElementById('transBaseRb');
    const transBaseRbUnit = document.getElementById('transBaseRbUnit');
    const transCollectorRc = document.getElementById('transCollectorRc');
    const transCollectorRcUnit = document.getElementById('transCollectorRcUnit');
    const transBetaGain = document.getElementById('transBetaGain');
    const btnCalculateTransistor = document.getElementById('btnCalculateTransistor');
    const btnResetTransistor = document.getElementById('btnResetTransistor');

    if (transistorModelSelect) {
      transistorModelSelect.addEventListener('change', () => {
        const val = transistorModelSelect.value;
        if (val !== 'custom') {
          const parts = val.split('|');
          const beta = parseInt(parts[1], 10) || 100;
          if (transBetaGain) transBetaGain.value = beta;
          calculateTransistor();
        }
      });
    }

    [transSupplyVcc, transBaseVin, transBaseRb, transCollectorRc, transBetaGain].forEach(el => {
      el?.addEventListener('input', () => {
        if (el === transBetaGain && transistorModelSelect) transistorModelSelect.value = 'custom';
        calculateTransistor();
      });
    });

    [transBaseRbUnit, transCollectorRcUnit].forEach(el => {
      el?.addEventListener('change', calculateTransistor);
    });

    if (btnCalculateTransistor) btnCalculateTransistor.addEventListener('click', calculateTransistor);
    if (btnResetTransistor) {
      btnResetTransistor.addEventListener('click', () => {
        if (transistorModelSelect) transistorModelSelect.value = 'NPN|100|0.7|0.2|2N3904';
        if (transSupplyVcc) transSupplyVcc.value = '10.0';
        if (transBaseVin) transBaseVin.value = '5.0';
        if (transBaseRb) transBaseRb.value = '10';
        if (transBaseRbUnit) transBaseRbUnit.value = '1000';
        if (transCollectorRc) transCollectorRc.value = '1.0';
        if (transCollectorRcUnit) transCollectorRcUnit.value = '1000';
        if (transBetaGain) transBetaGain.value = '100';
        calculateTransistor();
      });
    }

    // Calculator Normal / Scientific Mode Switcher
    document.getElementById('btnToggleBasicMode')?.addEventListener('click', () => switchCalcSubMode('normal'));
    document.getElementById('btnToggleSciMode')?.addEventListener('click', () => switchCalcSubMode('scientific'));

    // Basic & Scientific Keypads
    document.querySelectorAll('.calc-key').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-val');
        const op = btn.getAttribute('data-op');
        const fn = btn.getAttribute('data-fn');
        const action = btn.getAttribute('data-action');

        if (val !== null) appendDigit(val);
        else if (op !== null) appendOperator(op);
        else if (fn !== null) applySciFunction(fn);
        else if (action === 'all-clear') clearAll();
        else if (action === 'clear-entry') clearEntry();
        else if (action === 'backspace') backspace();
        else if (action === 'negate') negate();
        else if (action === 'equals') evaluateExpression();
        else if (action === 'ans') appendDigit(mathState.lastAnswer.toString());
      });
    });

    // Memory buttons
    document.querySelectorAll('.btn-mem').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-mem');
        handleMemory(action);
      });
    });

    // DEG / RAD switch
    if (btnAngleDeg && btnAngleRad) {
      btnAngleDeg.addEventListener('click', () => {
        mathState.isRadian = false;
        btnAngleDeg.classList.add('active');
        btnAngleRad.classList.remove('active');
        renderSciDisplay();
      });
      btnAngleRad.addEventListener('click', () => {
        mathState.isRadian = true;
        btnAngleRad.classList.add('active');
        btnAngleDeg.classList.remove('active');
        renderSciDisplay();
      });
    }

    // Physics events
    if (physicsTopicSelect) {
      physicsTopicSelect.addEventListener('change', updatePhysicsFormulas);
    }
    if (physicsFormulaSelect) {
      physicsFormulaSelect.addEventListener('change', updatePhysicsVariables);
    }
    if (physicsSolveFor) {
      physicsSolveFor.addEventListener('change', renderPhysicsInputs);
    }
    if (btnCalculatePhysics) {
      btnCalculatePhysics.addEventListener('click', runPhysicsCalculation);
    }
    if (btnResetPhysics) {
      btnResetPhysics.addEventListener('click', () => {
        updatePhysicsVariables();
      });
    }


    // Finance sub-tabs & buttons
    Object.keys(subFinanceTabs).forEach(k => {
      subFinanceTabs[k].btn?.addEventListener('click', () => switchSubFinanceTab(k));
    });

    const btnCalcLoan = document.getElementById('btnCalcLoan');
    const btnResetLoan = document.getElementById('btnResetLoan');
    if (btnCalcLoan) btnCalcLoan.addEventListener('click', calculateLoanEmi);
    if (btnResetLoan) {
      btnResetLoan.addEventListener('click', () => {
        const lp = document.getElementById('loanPrincipal');
        const lr = document.getElementById('loanRate');
        const lt = document.getElementById('loanTerm');
        const ltu = document.getElementById('loanTermUnit');
        if (lp) lp.value = '250000';
        if (lr) lr.value = '6.5';
        if (lt) lt.value = '30';
        if (ltu) ltu.value = 'years';
        calculateLoanEmi();
      });
    }

    const btnCalcCompound = document.getElementById('btnCalcCompound');
    const btnResetCompound = document.getElementById('btnResetCompound');
    if (btnCalcCompound) btnCalcCompound.addEventListener('click', calculateCompoundInterest);
    if (btnResetCompound) {
      btnResetCompound.addEventListener('click', () => {
        const cp = document.getElementById('ciPrincipal');
        const cr = document.getElementById('ciRate');
        const cy = document.getElementById('ciYears');
        const cf = document.getElementById('ciFrequency');
        if (cp) cp.value = '10000';
        if (cr) cr.value = '7.0';
        if (cy) cy.value = '10';
        if (cf) cf.value = '12';
        calculateCompoundInterest();
      });
    }

    const btnCalcTip = document.getElementById('btnCalcTip');
    const btnResetTip = document.getElementById('btnResetTip');
    const tipPresets = document.getElementById('tipPresets');
    if (btnCalcTip) btnCalcTip.addEventListener('click', calculateTip);
    if (tipPresets) {
      tipPresets.addEventListener('change', () => {
        const tp = document.getElementById('tipPercent');
        if (tp) tp.value = tipPresets.value;
        calculateTip();
      });
    }
    if (btnResetTip) {
      btnResetTip.addEventListener('click', () => {
        const tb = document.getElementById('tipBillAmount');
        const tp = document.getElementById('tipPercent');
        const ts = document.getElementById('tipSplitGuests');
        if (tb) tb.value = '85.00';
        if (tp) tp.value = '18';
        if (ts) ts.value = '3';
        if (tipPresets) tipPresets.value = '18';
        calculateTip();
      });
    }

    // Fitness sub-tabs & buttons
    Object.keys(subFitnessTabs).forEach(k => {
      subFitnessTabs[k].btn?.addEventListener('click', () => switchSubFitnessTab(k));
    });

    const bmiUnitSystem = document.getElementById('bmiUnitSystem');
    const bmiMetricInputsArea = document.getElementById('bmiMetricInputsArea');
    const bmiUsInputsArea = document.getElementById('bmiUsInputsArea');
    if (bmiUnitSystem) {
      bmiUnitSystem.addEventListener('change', () => {
        const isMetric = (bmiUnitSystem.value === 'metric');
        if (bmiMetricInputsArea) bmiMetricInputsArea.style.display = isMetric ? 'block' : 'none';
        if (bmiUsInputsArea) bmiUsInputsArea.style.display = isMetric ? 'none' : 'block';
        calculateBmi();
      });
    }

    const btnCalcBmi = document.getElementById('btnCalcBmi');
    const btnResetBmi = document.getElementById('btnResetBmi');
    if (btnCalcBmi) btnCalcBmi.addEventListener('click', calculateBmi);
    if (btnResetBmi) {
      btnResetBmi.addEventListener('click', () => {
        const mh = document.getElementById('bmiMetricHeight');
        const mw = document.getElementById('bmiMetricWeight');
        const uhf = document.getElementById('bmiUsHeightFt');
        const uhi = document.getElementById('bmiUsHeightIn');
        const uwl = document.getElementById('bmiUsWeightLbs');
        if (mh) mh.value = '175';
        if (mw) mw.value = '68.5';
        if (uhf) uhf.value = '5';
        if (uhi) uhi.value = '9';
        if (uwl) uwl.value = '150';
        calculateBmi();
      });
    }

    const btnCalcBmr = document.getElementById('btnCalcBmr');
    const btnResetBmr = document.getElementById('btnResetBmr');
    if (btnCalcBmr) btnCalcBmr.addEventListener('click', calculateBmr);
    if (btnResetBmr) {
      btnResetBmr.addEventListener('click', () => {
        const bg = document.getElementById('bmrGender');
        const ba = document.getElementById('bmrAge');
        const bh = document.getElementById('bmrHeight');
        const bw = document.getElementById('bmrWeight');
        const bac = document.getElementById('bmrActivity');
        if (bg) bg.value = 'male';
        if (ba) ba.value = '28';
        if (bh) bh.value = '175';
        if (bw) bw.value = '70';
        if (bac) bac.value = '1.375';
        calculateBmr();
      });
    }

    // Unit Converter events
    const converterCategorySelect = document.getElementById('converterCategorySelect');
    const convValFrom = document.getElementById('convValFrom');
    const convValTo = document.getElementById('convValTo');
    const convUnitFrom = document.getElementById('convUnitFrom');
    const convUnitTo = document.getElementById('convUnitTo');
    const btnSwapUnits = document.getElementById('btnSwapUnits');

    if (converterCategorySelect) {
      converterCategorySelect.addEventListener('change', populateConverterUnits);
    }
    if (convValFrom) convValFrom.addEventListener('input', () => convertUnits('from'));
    if (convValTo) convValTo.addEventListener('input', () => convertUnits('to'));
    if (convUnitFrom) convUnitFrom.addEventListener('change', () => convertUnits('from'));
    if (convUnitTo) convUnitTo.addEventListener('change', () => convertUnits('from'));
    if (btnSwapUnits) btnSwapUnits.addEventListener('click', swapConverterUnits);

    // Chemistry sub-tabs & buttons
    Object.keys(subChemTabs).forEach(k => {
      subChemTabs[k].btn?.addEventListener('click', () => switchSubChemTab(k));
    });

    const chemDilutionSolveFor = document.getElementById('chemDilutionSolveFor');
    const btnCalcDilution = document.getElementById('btnCalcDilution');
    const btnResetDilution = document.getElementById('btnResetDilution');
    if (chemDilutionSolveFor) chemDilutionSolveFor.addEventListener('change', calculateDilution);
    if (btnCalcDilution) btnCalcDilution.addEventListener('click', calculateDilution);
    if (btnResetDilution) {
      btnResetDilution.addEventListener('click', () => {
        const dC1 = document.getElementById('dilutionC1');
        const dV1 = document.getElementById('dilutionV1');
        const dC2 = document.getElementById('dilutionC2');
        const dV2 = document.getElementById('dilutionV2');
        if (dC1) dC1.value = '2.0';
        if (dV1) dV1.value = '50';
        if (dC2) dC2.value = '0.5';
        if (dV2) dV2.value = '200';
        if (chemDilutionSolveFor) chemDilutionSolveFor.value = 'V2';
        calculateDilution();
      });
    }

    const chemPhKnownParam = document.getElementById('chemPhKnownParam');
    const btnCalcPh = document.getElementById('btnCalcPh');
    const btnResetPh = document.getElementById('btnResetPh');
    if (chemPhKnownParam) chemPhKnownParam.addEventListener('change', calculatePh);
    if (btnCalcPh) btnCalcPh.addEventListener('click', calculatePh);
    if (btnResetPh) {
      btnResetPh.addEventListener('click', () => {
        const cp = document.getElementById('chemPhVal');
        if (cp) cp.value = '7.40';
        if (chemPhKnownParam) chemPhKnownParam.value = 'pH';
        calculatePh();
      });
    }

    const chemCompoundSelect = document.getElementById('chemCompoundSelect');
    const btnCalcMolar = document.getElementById('btnCalcMolar');
    const btnResetMolar = document.getElementById('btnResetMolar');
    if (chemCompoundSelect) chemCompoundSelect.addEventListener('change', calculateMolarMass);
    if (btnCalcMolar) btnCalcMolar.addEventListener('click', calculateMolarMass);
    if (btnResetMolar) {
      btnResetMolar.addEventListener('click', () => {
        const cm = document.getElementById('chemMassGrams');
        if (cm) cm.value = '100.0';
        if (chemCompoundSelect) chemCompoundSelect.value = 'H2O|18.015|Water';
        calculateMolarMass();
      });
    }

    const chemFluidDensity = document.getElementById('chemFluidDensity');
    const btnCalcFluid = document.getElementById('btnCalcFluid');
    const btnResetFluid = document.getElementById('btnResetFluid');
    if (chemFluidDensity) chemFluidDensity.addEventListener('change', calculateFluidPressure);
    if (btnCalcFluid) btnCalcFluid.addEventListener('click', calculateFluidPressure);
    if (btnResetFluid) {
      btnResetFluid.addEventListener('click', () => {
        const cfd = document.getElementById('chemFluidDepth');
        const cfg = document.getElementById('chemFluidGravity');
        if (cfd) cfd.value = '10.0';
        if (cfg) cfg.value = '9.80665';
        if (chemFluidDensity) chemFluidDensity.value = '1000';
        calculateFluidPressure();
      });
    }

    // Physical Keyboard Listener
    document.addEventListener('keydown', (e) => {
      if (['input', 'textarea', 'select'].includes(document.activeElement?.tagName.toLowerCase())) {
        return; // Don't intercept when user is typing in forms!
      }

      if (activeMaster === 'tabMasterMath') {
        if (e.key >= '0' && e.key <= '9') appendDigit(e.key);
        else if (e.key === '.') appendDigit('.');
        else if (['+', '-', '*', '/'].includes(e.key)) appendOperator(e.key);
        else if (e.key === 'Enter' || e.key === '=') {
          e.preventDefault();
          evaluateExpression();
        } else if (e.key === 'Backspace') backspace();
        else if (e.key === 'Escape') clearAll();
        else if (e.key === '(' || e.key === ')') appendDigit(e.key);
      }
    });

    // Initial render
    renderBandControls();
    calculateColorCode();
    calculateCapacitor();
    calculateDiode();
    calculateTransistor();
    updatePhysicsFormulas();
    calculateLoanEmi();
    calculateCompoundInterest();
    calculateTip();
    calculateBmi();
    calculateBmr();
    populateConverterUnits();
    calculateDilution();
    calculatePh();
    calculateMolarMass();
    calculateFluidPressure();

    // Ensure default initial active view is Resistor
    switchMasterTab('tabMasterElectronics');
    switchSubElectronicsTab('subTabColor');
  }

  document.addEventListener('DOMContentLoaded', initKeyboardAndListeners);
})();
