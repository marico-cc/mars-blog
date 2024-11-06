import { FC, SVGProps } from 'react';

export const SvgIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  const { name, color = '#4c4c4c', className, width = 20, height = 20, ...restProps } = props;
  const icons: { [key: string]: any } = {};

  icons.delete = (
    <svg className={className} width={width} height={height} {...restProps} viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M11.263 2c.93 0 1.684.716 1.684 1.6h4.632A.41.41 0 0 1 18 4c0 .22-.189.4-.421.4h-1.263v11.2c0 1.325-1.131 2.4-2.527 2.4H6.211c-1.396 0-2.527-1.075-2.527-2.4V4.4H2.421A.41.41 0 0 1 2 4c0-.22.189-.4.421-.4h4.632c0-.884.754-1.6 1.684-1.6h2.526zm4.21 2.4H4.527v11.2c0 .843.687 1.535 1.559 1.596l.126.004h7.578c.888 0 1.616-.653 1.68-1.48l.005-.12V4.4zM8.317 7.6a.41.41 0 0 1 .42.4v5.6c0 .22-.188.4-.42.4a.41.41 0 0 1-.421-.4V8c0-.22.188-.4.42-.4zm3.368 0a.41.41 0 0 1 .421.4v5.6c0 .22-.188.4-.42.4a.41.41 0 0 1-.422-.4V8c0-.22.189-.4.421-.4zm-.42-4.8H8.736c-.432 0-.788.309-.837.707l-.005.093h4.21c0-.41-.325-.748-.744-.795l-.098-.005z'
        fill={color}
        fillRule='nonzero'
      />
    </svg>
  );

  icons.plus = (
    <svg className={className} width={width} height={height} {...restProps} viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'>
      <path d='M14.014 7.614H8.386V1.986a.386.386 0 0 0-.772 0v5.628H1.986a.386.386 0 0 0 0 .772h5.628v5.628a.386.386 0 0 0 .772 0V8.386h5.628a.386.386 0 0 0 0-.772' fill='#fff' stroke={color || '#2BB67D'} strokeWidth='.5' fillRule='evenodd' />
    </svg>
  );

  icons.link = (
    <svg className={className} width={width} height={height} {...restProps} viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <path id='vwgyyd8a7a' d='M0 0h9.37v9.801H0z' />
      </defs>
      <g fill='none' fillRule='evenodd'>
        <path
          d='M13.211 18h-9.46C2.784 18 2 17.167 2 16.143V6.857C2 5.833 2.785 5 3.75 5h6.575a.47.47 0 0 1 0 .94H3.75c-.448 0-.812.412-.812.917v9.286c0 .505.364.917.812.917h9.461c.448 0 .813-.412.813-.917V9.935a.47.47 0 1 1 .938 0v6.208c0 1.024-.786 1.857-1.75 1.857'
          fill={color}
        />
        <g transform='rotate(180 9 5.932)'>
          <mask id='0rfw4hk4hb' fill='#fff'>
            <use xlinkHref='#vwgyyd8a7a' />
          </mask>
          <path
            d='m.001 9.332.001.014a.475.475 0 0 0 .038.167l.004.007c.025.055.06.105.104.147l.003.003.007.005c.043.04.093.071.149.093l.017.005a.48.48 0 0 0 .157.028h5.843a.48.48 0 0 0 .48-.478.48.48 0 0 0-.48-.479H1.598L9.238.807A.476.476 0 0 0 8.888 0a.48.48 0 0 0-.349.15L.962 8.12V3.51a.48.48 0 0 0-.962 0v5.813l.001.009'
            fill={color}
            mask='url(#0rfw4hk4hb)'
          />
        </g>
      </g>
    </svg>
  );

  icons.loading = (
    <svg className={className} width={width} height={height} {...restProps} viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M10.094 0c3.344 0 6.615 1.641 8.54 4.641A9.918 9.918 0 0 1 20 7.984l-1.898.325a8.008 8.008 0 0 0-1.093-2.647c-1.51-2.353-4.094-3.757-6.915-3.757-1.547 0-3.06.436-4.373 1.262C1.913 5.559.783 10.57 3.2 14.338c1.509 2.353 4.093 3.757 6.914 3.757 1.547 0 3.06-.436 4.373-1.261a8.115 8.115 0 0 0 1.619-1.342l1.454 1.249a10.073 10.073 0 0 1-2.041 1.7A10.132 10.132 0 0 1 10.114 20c-3.343 0-6.615-1.641-8.54-4.64C-1.415 10.696-.02 4.518 4.69 1.558A10.133 10.133 0 0 1 10.094 0z'
        fill='#D9D9D9'
        fillRule='evenodd'
      />
    </svg>
  );

  icons.home = (
    <svg className={className} width={width} height={height} {...restProps} viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M8.548 2.492a2.234 2.234 0 0 1 2.66-.103l.123.092 5.887 4.705c.454.363.733.887.776 1.449l.006.154v7.127c0 1.107-.897 2.012-2.03 2.08l-.137.004H4.167c-1.15 0-2.092-.863-2.163-1.952L2 15.916V8.78c0-.562.236-1.099.651-1.49l.117-.102 5.78-4.697zm2.144.729a1.204 1.204 0 0 0-1.403-.064l-.095.07-5.78 4.697a1.11 1.11 0 0 0-.407.734L3 8.781v7.135c0 .583.463 1.062 1.054 1.117l.113.005H6.69V13.11c0-1.771 1.493-3.207 3.334-3.207 1.84 0 3.333 1.436 3.333 3.207v3.927l2.476.001c.607 0 1.105-.445 1.162-1.014l.005-.108V8.789a1.1 1.1 0 0 0-.326-.778l-.095-.085-5.887-4.705zm-.668 7.644c-1.241 0-2.256.932-2.33 2.108l-.004.137v3.847h4.667V13.11c0-1.194-.969-2.17-2.191-2.24l-.142-.005z'
        fill={color}
        fillRule='nonzero'
      />
    </svg>
  );
  icons.inventory = (
    <svg className={className} width={width} height={height} {...restProps} xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <path id='471kin76va' d='M0 0h13.333v16.667H0z' />
      </defs>
      <g fill='none' fillRule='evenodd'>
        <g transform='translate(3.333 1.667)'>
          <mask id='95tnljg8db' fill='#fff'>
            <use xlinkHref='#471kin76va' />
          </mask>
          <path
            d='M12.37 15.167c0 .276-.216.5-.482.5H1.445a.492.492 0 0 1-.482-.5V2.682c0-.276.216-.5.482-.5h1.2v.707c0 .276.217.5.483.5h7.078a.49.49 0 0 0 .482-.5v-.707h1.2c.266 0 .482.224.482.5v12.485zM3.61 2.166C3.61 1.523 4.112 1 4.732 1H8.6c.62 0 1.124.523 1.124 1.166v.223H3.61v-.223zm8.278-.984h-1.391c-.013 0-.025.003-.037.004C10.114.483 9.41 0 8.6 0H4.733c-.81 0-1.511.482-1.857 1.182H1.445C.648 1.182 0 1.855 0 2.682v12.485c0 .827.648 1.5 1.445 1.5h10.443c.797 0 1.445-.673 1.445-1.5V2.682c0-.827-.648-1.5-1.445-1.5z'
            fill={color}
            mask='url(#95tnljg8db)'
          />
        </g>
        <path
          d='M6.701 10.22h-.016a.556.556 0 0 1-.408-.202l-.86-1.03a.598.598 0 0 1 .058-.822.548.548 0 0 1 .792.06l.458.548 1.67-1.785a.548.548 0 0 1 .794-.012.599.599 0 0 1 .012.824l-2.096 2.241a.552.552 0 0 1-.404.177M6.701 15.262h-.016a.556.556 0 0 1-.408-.201l-.86-1.03a.598.598 0 0 1 .058-.822.548.548 0 0 1 .792.06l.458.548 1.67-1.785a.548.548 0 0 1 .794-.012.599.599 0 0 1 .012.824l-2.096 2.241a.552.552 0 0 1-.404.177M14.084 9.099h-3.372a.573.573 0 0 1-.562-.584c0-.321.252-.583.562-.583h3.372c.31 0 .562.262.562.583a.573.573 0 0 1-.562.584M14.084 14.142h-3.372a.573.573 0 0 1-.562-.583c0-.322.252-.583.562-.583h3.372c.31 0 .562.26.562.583a.573.573 0 0 1-.562.583'
          fill={color}
        />
      </g>
    </svg>
  );

  icons.product = (
    <svg className={className} width={width} height={height} {...restProps} viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <path id='2fs1563yia' d='M0 0h16v16H0z' />
      </defs>
      <g fill='none' fillRule='evenodd'>
        <g transform='translate(2 2)'>
          <mask id='3drezf025b' fill='#fff'>
            <use xlinkHref='#2fs1563yia' />
          </mask>
          <path
            d='M1.782.97a.81.81 0 0 0-.81.809v6.57c0 .216.084.418.236.571l5.847 5.868c.313.313.81.32 1.131.016l6.59-6.227a.81.81 0 0 0 .032-1.143l-5.88-6.21A.814.814 0 0 0 8.34.97H1.782zM7.629 16c-.456 0-.912-.176-1.263-.528L.52 9.604A1.766 1.766 0 0 1 0 8.35V1.779C0 .799.8 0 1.782 0h6.557c.488 0 .96.203 1.295.557l5.88 6.211a1.78 1.78 0 0 1-.07 2.514l-6.59 6.227A1.778 1.778 0 0 1 7.63 16z'
            fill={color}
            mask='url(#3drezf025b)'
          />
        </g>
        <path d='M6.485 4.02a2.2 2.2 0 0 0-2.202 2.199 2.2 2.2 0 0 0 2.202 2.199 2.2 2.2 0 0 0 2.203-2.2A2.2 2.2 0 0 0 6.485 4.02m0 .97c.679 0 1.23.551 1.23 1.229a1.231 1.231 0 0 1-2.46 0c0-.678.552-1.23 1.23-1.23' fill={color} />
      </g>
    </svg>
  );

  icons.order = (
    <svg className={className} width={width} height={height} {...restProps} viewBox='0 0 21 20' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <path id='ms986ewjma' d='M0 0h16v16H0z' />
      </defs>
      <g transform='translate(2.246 2)' fill='none' fillRule='evenodd'>
        <mask id='k3gfpn8eyb' fill='#fff'>
          <use xlinkHref='#ms986ewjma' />
        </mask>
        <path
          d='M14.91 13.699c0 .683-.57 1.239-1.272 1.239H2.362c-.701 0-1.272-.556-1.272-1.24V2.302c0-.683.57-1.239 1.272-1.239h2.883v3.16c0 .612.571 1.11 1.272 1.11h3.205c.7 0 1.271-.498 1.271-1.11v-3.16h2.645c.701 0 1.272.556 1.272 1.24v11.397zM9.907 4.203c-.01.017-.074.066-.185.066H6.517a.332.332 0 0 1-.181-.046v-3.16h3.568l.003 3.14zM13.638 0H2.362C1.06 0 0 1.032 0 2.301V13.7C0 14.968 1.06 16 2.362 16h11.276C14.94 16 16 14.968 16 13.699V2.3C16 1.032 14.94 0 13.638 0z'
          fill={color}
          mask='url(#k3gfpn8eyb)'
        />
      </g>
    </svg>
  );

  icons.setting = (
    <svg className={className} width={width} height={height} {...restProps} viewBox='0 0 21 20' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <path id='9eoxsq3qba' d='M0 0h4.251v16H0z' />
        <path id='bdvbxpgagc' d='M0 0h4.251v16H0z' />
        <path id='tvrpkc0eve' d='M0 0h4.252v16H0z' />
      </defs>
      <g fill='none' fillRule='evenodd'>
        <g transform='translate(3.846 2)'>
          <mask id='0ks2wcissb' fill='#fff'>
            <use xlinkHref='#9eoxsq3qba' />
          </mask>
          <path
            d='M2.126 13.111a1.193 1.193 0 0 1-1.182-1.2c0-.663.53-1.202 1.182-1.202.651 0 1.181.539 1.181 1.201s-.53 1.201-1.181 1.201m2.125-1.2a2.156 2.156 0 0 0-1.654-2.106V.48A.476.476 0 0 0 2.126 0a.476.476 0 0 0-.472.48v9.325A2.156 2.156 0 0 0 0 11.91c0 1.026.708 1.886 1.654 2.105v1.505c0 .265.211.48.472.48.26 0 .471-.215.471-.48v-1.505a2.155 2.155 0 0 0 1.654-2.105'
            fill={color}
            mask='url(#0ks2wcissb)'
          />
        </g>
        <g transform='translate(12.394 2)'>
          <mask id='x6r7ybnurd' fill='#fff'>
            <use xlinkHref='#bdvbxpgagc' />
          </mask>
          <path
            d='M2.126 13.111a1.193 1.193 0 0 1-1.182-1.2c0-.663.53-1.202 1.182-1.202.651 0 1.182.539 1.182 1.201s-.53 1.201-1.182 1.201m2.126-1.2c0-1.03-.712-1.89-1.66-2.107.002-.02.005-.04.005-.06V.48A.476.476 0 0 0 2.126 0a.476.476 0 0 0-.472.48v9.264c0 .02.003.04.006.06A2.155 2.155 0 0 0 0 11.91c0 1.026.708 1.886 1.654 2.105v1.505c0 .265.211.48.472.48.26 0 .471-.215.471-.48v-1.505a2.155 2.155 0 0 0 1.655-2.105'
            fill={color}
            mask='url(#x6r7ybnurd)'
          />
        </g>
        <g transform='translate(8.114 2)'>
          <mask id='xjowa9crof' fill='#fff'>
            <use xlinkHref='#tvrpkc0eve' />
          </mask>
          <path
            d='M2.126 5.248A1.193 1.193 0 0 1 .944 4.047c0-.662.53-1.201 1.182-1.201.651 0 1.182.539 1.182 1.2 0 .663-.53 1.202-1.182 1.202m2.126-1.201a2.155 2.155 0 0 0-1.655-2.105V.48A.476.476 0 0 0 2.126 0a.476.476 0 0 0-.472.48v1.462A2.156 2.156 0 0 0 0 4.047C0 5.073.708 5.933 1.654 6.15v9.37c0 .264.211.479.472.479.26 0 .471-.215.471-.48V6.151a2.155 2.155 0 0 0 1.655-2.104'
            fill={color}
            mask='url(#xjowa9crof)'
          />
        </g>
      </g>
    </svg>
  );

  if (!name) return <></>;

  return <>{icons[name]}</>;
};
