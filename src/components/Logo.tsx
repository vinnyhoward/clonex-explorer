import React from "react";

interface LogoProps {
  width?: number;
  height?: number;
  rotate?: boolean;
  scale?: number;
  color?: string;
}

const Logo: React.FC<LogoProps> = ({
  width = 155,
  height = 34,
  rotate = false,
  scale = 1.25,
  color = "#FFFFFF",
}) => {
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;
  return (
    <svg
      width={`${scaledWidth}px`}
      height={`${scaledHeight}px`}
      viewBox={`0 0 ${width} ${height}`}
      version="1.1"
      style={{
        transform: rotate ? "rotate(-90deg)" : "none",
        transformOrigin: "center",
      }}
    >
      <title>Group 15</title>
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="C_Header/1440px/Regular"
          transform="translate(-24.000000, -27.000000)"
          fill={color}
        >
          <g id="Group-15" transform="translate(24.000000, 26.999948)">
            <path
              d="M0,7.10542736e-15 C0,7.10542736e-15 1.20119417,0.356036011 3.10064447,0.902234072 L3.61166202,1.04892515 C3.87475983,1.12431848 4.14899318,1.20270167 4.43324599,1.28370665 L5.01478022,1.44910326 C6.89651529,1.98323817 9.1502974,2.61269255 11.4926013,3.24395695 L12.234888,3.44325471 C12.7312666,3.57601457 13.2302459,3.70841839 13.7291803,3.83959366 L14.4772175,4.03532608 C18.7121566,5.13801904 22.8482839,6.12042914 25.2609199,6.4467209 C25.4970453,6.47865598 25.8841993,6.55667182 26.2957801,6.60183499 L26.4510206,6.61707705 C27.9060029,6.7420854 29.4663526,6.34378181 25.7040084,2.03789586 L25.7040084,2.03789586 L36.1901813,5.75101119 C38.392034,6.53075253 40.2623395,8.04357959 41.4908333,10.0389441 L41.4908333,10.0389441 L50.0869565,24.0000516 C50.0869565,24.0000516 45.9009505,21.6704572 41.2561072,19.126385 L40.6202254,18.7783354 L40.6202254,18.7783354 L39.6603319,18.2538827 C36.1345858,16.3297546 32.588986,14.4201819 30.5959318,13.4174795 C30.3481402,13.2928416 29.7912639,13.0291421 29.156925,12.799588 L28.982177,12.7379591 C28.8352432,12.687524 28.6853958,12.639666 28.535354,12.5964183 L28.3553845,12.5468642 C26.4683794,12.0525152 24.7231752,12.4192324 28.5589552,17.7144342 L28.5589552,17.7144342 Z M67.0696085,5.26522377 C67.2653064,5.2553471 71.7663591,5.06824181 71.7663591,8.75357025 L71.7663591,8.75357025 L71.7667129,8.8130099 C71.7627752,9.18510364 71.6496551,11.1967042 69.6844489,11.7748494 C69.6844489,11.7748494 72.0515919,12.5202949 72.0434783,14.9718657 C72.0423534,15.3100479 72.0415388,15.6084137 72.0409703,15.8715131 L72.0400795,16.4058941 C72.0400207,16.4590839 72.0399742,16.5102828 72.0399391,16.5595619 L72.0399993,17.0633115 C72.0400391,17.0983698 72.0400862,17.1317927 72.0401397,17.1636513 L72.0407657,17.4100615 C72.0408483,17.433174 72.0409342,17.4549355 72.0410225,17.475417 L72.0418531,17.6271114 C72.0419464,17.640553 72.042039,17.652928 72.04213,17.6643073 L72.0428764,17.7417606 C72.0429483,17.7478063 72.0430155,17.7530697 72.043077,17.7576219 L72.0434783,17.7826602 L67.6726005,17.7826602 L67.6724398,15.6937792 C67.6685583,15.5784616 67.5746714,13.8486978 65.4348225,13.8486978 L65.4348225,13.8486978 L57.8222315,13.8486978 L57.8222315,17.7826602 L53.2608696,17.7826602 L53.2608696,5.26557521 Z M91.8695652,5.26092112 L91.8695652,8.6599361 L84.7346557,8.6599361 L84.7346557,17.7826602 L80.2341703,17.7826602 L80.2341703,8.6599361 L73.0869565,8.6599361 L73.0869565,5.26092112 L91.8695652,5.26092112 Z M150.3044,5.26092112 L150.3044,8.6599361 L143.169471,8.6599361 L143.169471,17.7826602 L138.668973,17.7826602 L138.668973,8.6599361 L131.521739,8.6599361 L131.521739,5.26092112 L150.3044,5.26092112 Z M109.608696,5.26092112 L109.608696,8.66339644 L97.2790868,8.66339644 L97.2790868,10.4882491 L105.321638,10.4882491 L105.321638,13.6699923 L97.2790868,13.6699923 L97.2790868,17.7826602 L92.9130435,17.7826602 L92.9130435,5.26567073 L94.837902,5.26567073 L94.837902,5.26092112 L109.608696,5.26092112 Z M115.188631,5.26092112 L115.188631,9.47092827 L122.318179,5.26092112 L129.622166,5.28417806 L119.996115,10.9493698 L130.478261,17.7826602 L123.205414,17.7826602 L115.188631,12.5368438 L115.188631,17.7826602 L110.652174,17.7826602 L110.652174,5.26092112 L115.188631,5.26092112 Z M59.6462039,8.66389052 L57.8222315,8.66332684 L57.8222315,10.80892 L65.9835084,10.80892 C65.9835084,10.80892 67.2968385,10.9391605 67.2968385,9.66825339 C67.2968385,8.99680247 66.8916873,8.69857427 66.1160223,8.68082556 C65.7985974,8.673667 64.3528733,8.66943693 62.7551267,8.66693735 L62.2182533,8.66616661 C62.1282823,8.66604828 62.038177,8.66593489 61.9481047,8.66582622 L61.4094058,8.66522926 C61.3201351,8.66513867 61.2312321,8.66505239 61.1428643,8.66497022 L59.8784124,8.66402014 C59.7995816,8.66397392 59.722123,8.66393079 59.6462039,8.66389052 Z"
              id="Combined-Shape"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Logo;